package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class lastEvent_activity extends AppCompatActivity {
    TextView vehicle_details;
    TextView location;
    TextView time;
    TextView lastLocation;
    RequestQueue queue;
    SharedPreferences getpreferences;
    SharedPreferences getaccidentaldata;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_last_event_activity);

        vehicle_details=findViewById(R.id.textView7);
        location=findViewById(R.id.textView8);
        time=findViewById(R.id.textView9);
        lastLocation=findViewById(R.id.textView10);

        queue = Volley.newRequestQueue(this);
        getpreferences=getSharedPreferences("UserLoginData",MODE_PRIVATE);
        getaccidentaldata=getSharedPreferences("accidentdata",MODE_PRIVATE);

        fetch_data();
    }

    public void fetch_data(){
        final String gettoken=getpreferences.getString("key","null");

        String url ="https://backend-aas.herokuapp.com/api/rest-auth/user/";

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject object=new JSONObject(response);
                            String vehiclejson=object.getString("vehicle");

                            String currentDateandTime=getaccidentaldata.getString("eventtime","No Last Event Is Saved");
                            final String locationjson=getaccidentaldata.getString("eventlocation","No Last Event Is Saved");
                            final String LastLocation=getaccidentaldata.getString("lastlocation","No Last Location Is Saved");

                            time.setText(currentDateandTime);
                            location.setText(locationjson);
                            lastLocation.setText(LastLocation);
                            location.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    // Creates an Intent that will load a map of San Francisco
                                    Uri gmmIntentUri = Uri.parse("geo:"+locationjson+"?z=21");
                                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                                    mapIntent.setPackage("com.google.android.apps.maps");
                                    startActivity(mapIntent);
                                }
                            });
                            lastLocation.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View view) {
                                    // Creates an Intent that will load a map of San Francisco
                                    Uri gmmIntentUri = Uri.parse("geo:"+LastLocation+"?z=21");
                                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                                    mapIntent.setPackage("com.google.android.apps.maps");
                                    startActivity(mapIntent);
                                }
                            });
                            vehicle_details.setText(vehiclejson);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(lastEvent_activity.this,"Something Went Wrong \n Check Your Internet Connection",Toast.LENGTH_SHORT).show();
            }
        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();

                params.put("Authorization", "Token"+" "+gettoken);

                return params;
            }
        };


        queue.add(stringRequest);


    }
}