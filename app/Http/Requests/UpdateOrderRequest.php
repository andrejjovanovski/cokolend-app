<?php

namespace App\Http\Requests;

use App\Models\Order;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image_path' => 'required|image',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'production_status' => 'required|string', Rule::in('pending', 'processing', 'completed', 'delivered'),
            'delivery_location' => 'required|string|max:255',
            'delivery_date' => 'required|date',
            'delivery_time' => 'required|date_format:H:i',
            'customer_name' => 'required|string|max:255',
            'customer_phone_number' => 'required|string|max:255',

        ];
    }
}
