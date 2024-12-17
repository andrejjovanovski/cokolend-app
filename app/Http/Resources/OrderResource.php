<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class OrderResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    protected $dateFormat = 'Y-m-d';


    public function withDateFormat($format) {
        $this->dateFormat = $format;
        return $this;
    }



    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => new UserResource($this->whenLoaded('user')),
            'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'production_status' => $this->production_status,
            'delivery_location' => $this->delivery_location,
            'delivery_location_custom' => $this->delivery_location_custom,
            'delivery_date' => $this->delivery_date ? Carbon::parse($this->delivery_date)->format($this->dateFormat) : null,
            'delivery_time' => $this->delivery_time ? Carbon::parse($this->delivery_time)->format('H:i') : null,
            'delivered' => $this->delivered,
            'created_at' => $this->created_at ? Carbon::parse($this->created_at)->format('d-m-Y H:i:s') : null,
            'customer_name' => $this->customer_name,
            'customer_phone_number' => $this->customer_phone_number,
        ];
    }
}
