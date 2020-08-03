package com.example.aas;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class vehicleStatus_activity extends AppCompatActivity {
    RequestQueue requestQueue;
    TextView vehicleinfo;
    TextView percentagefuel;
    TextView percentagepoll;
    ProgressBar fuel;
    ProgressBar pollution;
    SharedPreferences getpreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vehicle_status_activity);

        vehicleinfo=findViewById(R.id.textView22);
        fuel=findViewById(R.id.progressBar);
        pollution=findViewById(R.id.progressBar2);
        percentagefuel=findViewById(R.id.textView23);
        percentagepoll=findViewById(R.id.textView24);

        fuel.setMax(100);
        pollution.setMax(100);

        fetchdata();
    }

    public void fetchdata(){
        final String gettoken=getpreferences.getString("key","null");

        String url = "https://backend-aas.herokuapp.com/api/rest-auth/user/";
        StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>()
                {
                    @RequiresApi(api = Build.VERSION_CODES.N)
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject object=new JSONObject(response);
                            String vehicleinfojson=object.getString("vehicle");
                            vehicleinfo.setText(vehicleinfojson);
                            int fuelstatusjson=object.getInt("vehicle_fuel");
                            int pollutionjson=object.getInt("vehicle_polution");
                            fuel.setProgress(fuelstatusjson,true);
                            pollution.setProgress(pollutionjson,true);
                            percentagefuel.setText(Integer.toString(fuelstatusjson)+"%");
                            percentagepoll.setText(Integer.toString(pollutionjson)+"%");


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Toast.makeText(vehicleStatus_activity.this,"Something Went Wrong \n Check Your Internet Connection",Toast.LENGTH_SHORT).show();
                    }
                }
        ) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();

                params.put("Authorization", "Token"+" "+gettoken);

                return params;
            }
        };

        requestQueue.add(getRequest);

    }
}