"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderGit2, BarChart3, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your projects and workflow automation
            </p>
          </div>
          <Link href="/projects/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Projects connected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Tasks in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open PRs</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Pull requests awaiting review</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4 inline" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Mobile App", key: "MOB", jiraKey: "MOB", github: "org/mobile-app", tasks: 8, prs: 3 },
            { name: "API Gateway", key: "API", jiraKey: "API", github: "org/api-gateway", tasks: 4, prs: 2 },
            { name: "Data Pipeline", key: "DATA", jiraKey: "DATA", github: "org/data-pipeline", tasks: 6, prs: 1 },
          ].map((project) => (
            <Card key={project.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{project.name}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{project.key}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Jira:</span>
                    <span className="font-mono">{project.jiraKey}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">GitHub:</span>
                    <span className="font-mono truncate max-w-[150px]">{project.github}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="text-muted-foreground">Tasks:</span>
                      <span className="font-medium">{project.tasks}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-muted-foreground">PRs:</span>
                      <span className="font-medium">{project.prs}</span>
                    </span>
                  </div>
                  <Link href={`/projects/${project.key.toLowerCase()}`}>
                    <Button variant="outline" className="w-full mt-2">
                      Open Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
}