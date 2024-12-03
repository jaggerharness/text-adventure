"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRating(0);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-8">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`focus:outline-none ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
      <Textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full"
      />
      <Button type="submit" disabled={rating === 0 || review.trim() === ""}>
        Submit Review
      </Button>
    </form>
  );
}
