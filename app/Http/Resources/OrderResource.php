<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => new UserResource($this->whenLoaded('user')),
            'image_path' => $this->image_path,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'production_status' => $this->production_status,
            'delivery_location' => $this->delivery_location,
            'delivery_date' => $this->delivery_date,
            'delivery_time' => $this->delivery_time,
            'delivered' => $this->delivered,
            'created_at' => $this->created_at,
        ];
    }
}
