<?php

namespace App\Http\Controllers;

use App\Models\HeartData;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    function analysis(Request $req)
    {

        try{

            $age = (int)$req->input('age');
            $sex = (int)$req->input('sex');
            $bloodPressure = (int)$req->input('bloodPressure');
            $bloodSugar = (int)$req->input('bloodSugar');
            $chestPain = (int)$req->input('chestPain');
            $cholesterol = (int)$req->input('cholesterol');
            $userId = (int) $req->input('userId');

            $data = array($age, $sex, $chestPain, $bloodPressure, $cholesterol, $bloodSugar);

            $client = new Client(['base_uri' => 'http://localhost:5000']);
            $response = $client->post('/api/predict', [
                'json' => [
                    'age' => $age,
                    'sex' => $sex,
                    'bloodPressure' => $bloodPressure,
                    'bloodSugar' => $bloodSugar,
                    'chestPain' => $chestPain,
                    'cholesterol' => $cholesterol,
                ]
            ]);

            $predictionOutput = json_decode($response->getBody()->getContents())->prediction;

            $heartData = new HeartData();
            $heartData->age = $age;
            $heartData->sex = $sex;
            $heartData->chest_pain_type = $chestPain;
            $heartData->blood_pressure = $bloodPressure;
            $heartData->cholesterol_level = $cholesterol;
            $heartData->sugar_level = $bloodSugar;
            $heartData->is_heart_patient = $predictionOutput[0];
            $heartData->user_id = $userId;
            $heartData->save();

            return response()->json([
                'status' => true,
                'message' => 'Predicted Successfully',
                'data' => $predictionOutput[0]
            ], 200);
        }
        catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
                'data' => $e->getMessage()
            ], 500);
        }
    }

    function getHeartHistory(Request $req)
    {

        try{

            $userId = (int) $req->input('userId');

            $heartData = HeartData::where('user_id', $userId)->orderBy('id', 'desc')->get();

            if ($heartData->count() > 0) {
                return response()->json([
                    'status' => true,
                    'message' => 'Data Load Successfully',
                    'data' => $heartData
                ], 200);
            } else {
                return response()->json([
                    'status' => true,
                    'message' => 'No Data',
                    'data' => null
                ], 200);
            }

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
