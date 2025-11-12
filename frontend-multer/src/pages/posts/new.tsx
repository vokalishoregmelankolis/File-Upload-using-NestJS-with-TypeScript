import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";

function NewPostContent() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { token } = useAuth();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      let imagePath: string | undefined;

      // Upload image if selected
      if (imageFile) {
        const uploadResponse = null; // TODO
      }

      // Create post
      const response = null; // TODO

      if (response.ok) {
        router.push("/");
      } else if (response.status === 401) {
        alert("Please login to create posts");
        router.push("/auth/login");
      } else {
        alert("Error creating post");
      }
    } catch (error) {
      alert(
        "Error creating post: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1>Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows={5}
            required
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image (optional)
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
          />
        </div>

        {imagePreview && (
          <div className="mb-3">
            <div className="position-relative" style={{ maxWidth: "400px" }}>
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid rounded"
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                onClick={removeImage}
                disabled={isSubmitting}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
          <a href="/" className="btn btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}

export default function NewPost() {
  return (
    <ProtectedRoute>
      <NewPostContent />
    </ProtectedRoute>
  );
}
