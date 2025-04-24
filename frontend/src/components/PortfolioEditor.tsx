"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Card, CardContent } from "./ui/Card";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

interface PortfolioEditorProps {
  initialItems?: PortfolioItem[];
  onSave: (items: PortfolioItem[]) => void;
}

const PortfolioEditor = ({
  initialItems = [],
  onSave,
}: PortfolioEditorProps) => {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [newTag, setNewTag] = useState("");

  const addItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Describe your project here",
      imageUrl: "/placeholder.svg?height=300&width=400",
      tags: [],
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof PortfolioItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addTag = (id: string, tag: string) => {
    if (!tag.trim()) return;

    setItems(
      items.map((item) =>
        item.id === id && !item.tags.includes(tag)
          ? { ...item, tags: [...item.tags, tag] }
          : item
      )
    );
    setNewTag("");
  };

  const removeTag = (id: string, tagToRemove: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, tags: item.tags.filter((tag) => tag !== tagToRemove) }
          : item
      )
    );
  };

  const handleSave = () => {
    onSave(items);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Editor</h2>
        <div className="flex space-x-2">
          <Button onClick={addItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Portfolio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Project Title
                </label>
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  placeholder="Project Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Project Description"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Input
                  value={item.imageUrl}
                  onChange={(e) =>
                    updateItem(item.id, "imageUrl", e.target.value)
                  }
                  placeholder="Image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                        onClick={() => removeTag(item.id, tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(item.id, newTag);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(item.id, newTag)}
                    className="ml-2"
                    variant="outline"
                    size="sm"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Your portfolio is empty. Add your first project!
          </p>
          <Button onClick={addItem} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioEditor;
