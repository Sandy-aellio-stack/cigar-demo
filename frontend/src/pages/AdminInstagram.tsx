import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

const AdminInstagram = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/instagram/set-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Instagram token updated successfully",
        });
        setToken("");
      } else {
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to update token",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-charcoal-deep p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-cream">
            Instagram Token Management
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-border text-cream hover:bg-charcoal-medium"
          >
            Logout
          </Button>
        </div>

        <div className="bg-charcoal-medium p-8 rounded-lg border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token" className="text-cream">
                Instagram Long-Lived Access Token
              </Label>
              <Input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your Instagram long-lived token here"
                required
                className="bg-charcoal-deep border-border text-cream"
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                This token will be stored securely on the server and used to fetch Instagram posts.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-charcoal-deep"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Token"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border">
            <h2 className="font-display text-xl text-cream mb-4">
              How to Get a Long-Lived Token
            </h2>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Go to the Facebook Developers portal</li>
              <li>Create an app with Instagram Basic Display</li>
              <li>Generate a short-lived token</li>
              <li>Exchange it for a long-lived token (60 days)</li>
              <li>Paste the long-lived token above</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInstagram;
