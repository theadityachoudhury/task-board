/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from '../types/task';
import { ChatSettings } from '../types/chat';
import { AzureOpenAI } from 'openai';
const apiKey = "1fbc253c3214457e8d7477f8533215c1";
const endpoint = "https://ai-proxy.lab.epam.com";
const apiVersion = "2024-10-21";
const deployment = "gpt-4o";

export const generateTasksFromPrompt = async (
    prompt: string,
    settings: ChatSettings
): Promise<{ tasks: Task[], response: string }> => {
    try {
        const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment,dangerouslyAllowBrowser: true });

        const result = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a task management assistant. When given a prompt, extract tasks and return them in JSON format. Each task should have a title, description, and due date. Format your response with a brief message followed by a JSON array of tasks."
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

        if (jsonMatch) {
            const tasksJson = JSON.parse(jsonMatch[0]);
            tasks = tasksJson.map((task: any, index: number) => ({
                id: `task-${Date.now()}-${index}`,
                title: task.title,
                description: task.description || '',
                dueDate: task.dueDate || new Date().toISOString().split('T')[0],
                status: 'TODO',
                category: task.category,
                assignee: task.assignee
            }));
        }

        return {
            tasks,
            response: responseContent?.replace(/\[.*\]/s, '') || "I couldn't find any tasks in your message."
        };
    } catch (error) {
        console.error("Error generating tasks:", error);
        throw error;
    }
};