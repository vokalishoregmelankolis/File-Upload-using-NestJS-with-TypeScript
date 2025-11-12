import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/AuthContext";

interface Author {
  username: string;
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author?: Author;
  replyToId?: string;
}

export default function ReplyToPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id: postId } = router.query;
  const { user, token } = useAuth();

  useEffect(() => {
    // if (!user) {
    //   router.push("/auth/login");
    //   return;
    // }

    if (!postId) return;

    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId, router, user]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    // TODO
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim() || !token) return;

    setIsSubmitting(true);

    try {
      let imagePath: string | undefined;

      // Upload image to S3 if selected
      if (imageFile) {
        // Get presigned URL
        const presignedResponse = null; // TODO

        if (!presignedResponse.ok) {
          throw new Error("Failed to get presigned URL");
        }

        // Upload file to S3
        const uploadResponse = null; // TODO

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }
      }

      const response = null; // TODO

      if (response.ok) {
        router.push(`/posts/${postId}`);
      } else if (response.status === 401) {
        alert("Please login to create a reply");
        router.push("/auth/login");
      } else {
        alert("Error creating reply");
      }
    } catch (error) {
      alert(
        "Error creating reply: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="alert alert-danger">Post not found</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>Reply to Post</h1>

      <div className="mb-4 p-3 bg-light border-start border-4 border-secondary">
        <div className="small text-muted mb-2">Replying to:</div>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <strong>{post.author?.username || "Anonymous"}</strong>
          <small className="text-muted">
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div>{post.content}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Your Reply
          </label>
          <textarea
            className="form-control"
            id="content"
            rows={5}
            required
            placeholder="Write your reply here..."
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
            {isSubmitting ? "Posting..." : "Post Reply"}
          </button>
          <a href={`/posts/${postId}`} className="btn btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </>
  );
}
