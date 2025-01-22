<?php

namespace App\Http\Controllers;


use App\Models\PushNotification;
use Illuminate\Http\Request;
use Minishlink\WebPush\Subscription;
use Minishlink\WebPush\WebPush;

class PushNotificationController extends Controller
{
    public function saveSubscription(Request $request)
    {
        $data = $request->all();

//        dd($data);

        $subscription = new PushNotification();
        $subscription->subscriptions = $data['subscriptions'];
        $subscription->save();

        return response()->json(['message' => 'Subscription successfully created'], 200);
    }


    public function sendPushNotification($order, string $method){

        $auth = [
            'VAPID' => [
                'subject' => 'https://127.0.0.1:8000/', // can be a mailto: or your website address
                'publicKey' => 'BHv4C2J7vdf-7G9A1IKIQjb6krT2iBIuOUXZ2F-lLl9U_03ktMIZ2n6KVlJe5fDD3omgxn1Th2d9XsG9I_fXUhA',
                'privateKey' => 'PXqgDX_DckiG0yXmX4Js3wi-Sae4uuT2Ub1jRm7IzgY',
            ],
        ];

        $webPush = new WebPush($auth);

        $payload = json_encode([
            'title' => $method === 'create' ? "Нарачка #{$order->id} креирана" : "Нарачка #{$order->id} изменета",
            'body' => $order->name,
            'url' => $order->id,
        ]);

        $notifications = PushNotification::all();

        foreach ($notifications as $notification) {
            try {
                $subscriptionData = json_decode($notification->subscriptions, true);


                $webPush->sendOneNotification(
                    Subscription::create($subscriptionData),
                    $payload,
                    ['TTL' => 5000]
                );
            } catch (\ErrorException $e) {
            }
        }
    }
}
