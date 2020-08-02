package com.example.aas;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class executable extends BroadcastReceiver {

    RequestQueue requestQueue;
    SharedPreferences getpreferences;
    SharedPreferences accidentdata;

    @Override
    public void onReceive(Context context, Intent intent) {

        requestQueue= Volley.newRequestQueue(context);
        getpreferences=context.getSharedPreferences("UserLoginData",context.MODE_PRIVATE);
        accidentdata=context.getSharedPreferences("accidentdata",context.MODE_PRIVATE);

        fetch(context);

    }
    public void fetch(final Context context){


        final String gettoken=getpreferences.getString("key","null");

        String url = "https://backend-aas.herokuapp.com/api/rest-auth/user/";
        StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject object=new JSONObject(response);
                            int iseventoccured=object.getInt("accident");
                            if(iseventoccured==1){
                                String location=object.getString("vehicle_location");

                                SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy '('HH:mm:ss')'");
                                String currentDateandTime = sdf.format(new Date());

                                SharedPreferences.Editor edit=accidentdata.edit();
                                edit.putString("eventlocation",location);
                                edit.putString("eventtime",currentDateandTime);
                                edit.apply();

                                Intent i = new Intent();
                                i.setClassName(context,"com.example.aas.Alertclass");
                                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                context.startActivity(i);
                            }


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        String errormsg=error.toString();
                        Log.d("accidentfetcherror",errormsg);
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
