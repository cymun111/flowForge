"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ArrowLeft, FolderGit2, GitPullRequest, Brain, Settings, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("tasks");

  const project = {
    id: params.id,
    name: params.id === "1" ? "Mobile App" : params.id === "2" ? "API Gateway" : "Data Pipeline",
    key: params.id === "1" ? "MOB" : params.id === "2" ? "API" : "DATA",
    jiraProjectKey: params.id === "1" ? "MOB" : params.id === "2" ? "API" : "DATA",
    githubOwner: "org",
    githubRepo: params.id === "1" ? "mobile-app" : params.id === "2" ? "api-gateway" : "data-pipeline",
  };

  const tasks = [
    { id: "TASK-1", title: "Implement user authentication", status: "In Progress", priority: "High", assignee: "Kenyon W." },
    { id: "TASK-2", title: "Design database schema", status: "Done", priority: "High", assignee: "Kenyon W." },
    { id: "TASK-3", title: "Create API endpoints", status: "Todo", priority: "Medium", assignee: "Unassigned" },
    { id: "TASK-4", title: "Write unit tests", status: "Todo", priority: "Low", assignee: "Unassigned" },
  ];

  const prs = [
    { id: "PR-1", title: "feat: Add user auth flow", status: "Open", branch: "feature/auth", created: "2h ago" },
    { id: "PR-2", title: "fix: Resolve DB connection issue", status: "Under Review", branch: "fix/db-conn", created: "1d ago" },
    { id: "PR-3", title: "chore: Update dependencies", status: "Merged", branch: "chore/deps", created: "3d ago" },
  ];

  const statusColors: Record<string, string> = {
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Done": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Todo": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    "Open": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Under Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Merged": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    "High": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    "Medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Low": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-6 w-6" />
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <p className="text-sm text-muted-foreground">
                {project.githubOwner}/{project.githubRepo} &middot; {project.jiraProjectKey}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="prs" className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              Pull Requests
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Tasks</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>
            <div className="grid gap-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{task.id}</span>
                      <span className="font-medium">{task.title}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status] || ""}`}>
                      {task.status}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.priority] || ""}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-muted-foreground">{task.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pull Requests</h2>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create PR
              </Button>
            </div>
            <div className="grid gap-3">
              {prs.map((pr) => (
                <div key={pr.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <GitPullRequest className="h-5 w-5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium">{pr.title}</span>
                      <span className="text-xs text-muted-foreground">{pr.branch} &middot; {pr.created}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[pr.status] || ""}`}>
                      {pr.status}
                    </span>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <p className="text-sm text-muted-foreground">
                Use AI to generate code, review PRs, and automate tasks
              </p>
            </div>
            <div className="p-8 text-center border rounded-lg">
              <Brain className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">AI Features Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                Code generation, PR reviews, and smart suggestions
              </p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Project Settings</h2>
              <p className="text-sm text-muted-foreground">
                Configure Jira and GitHub connections for this project
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Jira Project</p>
                    <p className="text-sm text-muted-foreground">{project.jiraProjectKey}</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">GitHub Repository</p>
                    <p className="text-sm text-muted-foreground">{project.githubOwner}/{project.githubRepo}</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
