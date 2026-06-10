"use client";

import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Filter, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  name: string;
  key: string;
  jiraProjectKey?: string;
  githubRepo?: string;
  githubOwner?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Mobile App", key: "MOB", jiraProjectKey: "MOB", githubRepo: "mobile-app", githubOwner: "org", createdAt: "2024-01-15" },
    { id: "2", name: "API Gateway", key: "API", jiraProjectKey: "API", githubRepo: "api-gateway", githubOwner: "org", createdAt: "2024-02-01" },
    { id: "3", name: "Data Pipeline", key: "DATA", jiraProjectKey: "DATA", githubRepo: "data-pipeline", githubOwner: "org", createdAt: "2024-02-20" },
  ]);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", key: "", jiraProjectKey: "", githubOwner: "", githubRepo: "" });
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredProjects = projects.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.key.toLowerCase().includes(search.toLowerCase())
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!newProject.name.trim()) newErrors.name = "Name is required";
    if (!newProject.key.trim()) newErrors.key = "Key is required";
    else if (!/^[A-Z]{2,10}$/.test(newProject.key)) newErrors.key = "Key must be 2-10 uppercase letters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsCreating(true);
    setTimeout(() => {
      const project: Project = {
        id: Date.now().toString(),
        ...newProject,
        createdAt: new Date().toISOString(),
      };
      setProjects([...projects, project]);
      setNewProject({ name: "", key: "", jiraProjectKey: "", githubOwner: "", githubRepo: "" });
      setIsCreating(false);
      router.push("/projects");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your projects and connect Jira & GitHub
            </p>
          </div>
          <Dialog open={false} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      placeholder="Mobile App"
                      disabled={isCreating}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="key">Project Key</Label>
                    <Input
                      id="key"
                      value={newProject.key}
                      onChange={(e) => setNewProject({ ...newProject, key: e.target.value.toUpperCase() })}
                      placeholder="MOB"
                      maxLength={10}
                      disabled={isCreating}
                    />
                    <p className="text-xs text-muted-foreground">2-10 uppercase letters (e.g., MOB, API)</p>
                    {errors.key && <p className="text-sm text-red-500">{errors.key}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="jiraProjectKey">Jira Project Key</Label>
                    <Input
                      id="jiraProjectKey"
                      value={newProject.jiraProjectKey}
                      onChange={(e) => setNewProject({ ...newProject, jiraProjectKey: e.target.value.toUpperCase() })}
                      placeholder="MOB"
                      disabled={isCreating}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="githubOwner">GitHub Owner</Label>
                    <Input
                      id="githubOwner"
                      value={newProject.githubOwner}
                      onChange={(e) => setNewProject({ ...newProject, githubOwner: e.target.value })}
                      placeholder="my-org"
                      disabled={isCreating}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="githubRepo">GitHub Repository</Label>
                    <Input
                      id="githubRepo"
                      value={newProject.githubRepo}
                      onChange={(e) => setNewProject({ ...newProject, githubRepo: e.target.value })}
                      placeholder="mobile-app"
                      disabled={isCreating}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Create Project
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Plus className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
              <p className="text-muted-foreground">Create your first project to get started</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.name}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">{project.key}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Jira:</span>
                    <span className="font-mono">{project.jiraProjectKey || "Not connected"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">GitHub:</span>
                    <span className="font-mono">
                      {project.githubOwner && project.githubRepo ? `${project.githubOwner}/${project.githubRepo}` : "Not connected"}
                    </span>
                  </div>
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" className="w-full">
                      Open Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}