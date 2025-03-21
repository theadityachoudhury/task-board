/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from '../types/task';
import { ChatSettings } from '../types/chat';
import { AzureOpenAI } from 'openai';

const apiKey = "1fbc253c3214457e8d7477f8533215c1";
const endpoint = "https://ai-proxy.lab.epam.com";
const apiVersion = "2024-10-21";
const deployment = "gpt-4o";

// Generate a random color for categories
const generateRandomColor = () => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-red-100 text-red-800',
    'bg-gray-100 text-gray-800',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateTasksFromPrompt = async (
  prompt: string,
  settings: ChatSettings
): Promise<{ tasks: Task[], response: string, category: { id: string, name: string, color: string } }> => {
  try {
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });

    const result = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a task management assistant. When given a prompt, extract tasks and return them in JSON format. Each task should have a title, description, and due date. Also suggest a category name that summarizes all these tasks. Format your response with a brief message followed by a JSON array of tasks."
        },
        { role: "user", content: prompt }
      ],
      model: settings.agent || deployment,
      temperature: settings.temperature,
      max_tokens: settings.maxTokens,
    });

    const responseContent = result.choices[0].message.content;

    // Extract JSON tasks from the response
    const jsonMatch = responseContent?.match(/\[.*\]/s);
    let tasks: Task[] = [];

    // Generate a unique prompt ID to group tasks
    const promptId = `prompt-${Date.now()}`;

    // Generate a category name based on the prompt
    let categoryName = prompt.split(' ').slice(0, 3).join(' ');
    if (categoryName.length > 20) {
      categoryName = categoryName.substring(0, 20) + '...';
    }

    // Extract category name from AI response if available
    const categoryMatch = responseContent?.match(/category[:\s]+["']?([^"'\n]+)["']?/i);
    if (categoryMatch && categoryMatch[1]) {
      categoryName = categoryMatch[1].trim();
    }

    const category = {
      id: promptId,
      name: categoryName,
      color: generateRandomColor()
    };

    if (jsonMatch) {
      const tasksJson = JSON.parse(jsonMatch[0]);
      tasks = tasksJson.map((task: any, index: number) => ({
        id: `task-${Date.now()}-${index}`,
        title: task.title,
        description: task.description || '',
        dueDate: task.dueDate || new Date().toISOString().split('T')[0],
        status: 'TODO',
        category: categoryName,
        promptId: promptId,
        assignee: task.assignee
      }));
    }

    return {
      tasks,
      response: responseContent?.replace(/\[.*\]/s, '') || "No tasks found",
      category
    };
  } catch (error) {
    console.error("Error generating tasks:", error);
    throw error;
  }
};