<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\HeartData;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class FeedackController extends Controller
{
    function storeFeedback(Request $req)
    {

        try{

            $rating = (int)$req->input('rating');
            $feedback = $req->input('feedback');
            $userId = (int) $req->input('userId');

            $userFeedback = new Feedback();
            $userFeedback->rating = $rating;
            $userFeedback->description = $feedback;
            $userFeedback->user_id = $userId;
            $userFeedback->save();

            return response()->json([
                'status' => true,
                'message' => 'Data Saved Successfully',
            ], 201);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
                'data' => $e->getMessage()
            ], 500);
        }
    }

}
