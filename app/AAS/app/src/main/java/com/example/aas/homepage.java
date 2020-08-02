package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
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

public class homepage extends AppCompatActivity {
    TextView username;
    Button logout;
    Button lasteventinfobutton;
    Button getlocation;
    Button vehiclestatus;
    Button manageaccount;
    Button helpcare;
    Button aboutaas;
    RequestQueue queue;
    SharedPreferences getpreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_homepage);

        username=findViewById(R.id.textView4);
        logout=findViewById(R.id.button);
        getlocation=findViewById(R.id.button2);
        lasteventinfobutton=findViewById(R.id.button4);
        vehiclestatus=findViewById(R.id.button3);
        manageaccount=findViewById(R.id.button5);
        helpcare=findViewById(R.id.button6);
        aboutaas=findViewById(R.id.button7);

        getpreferences=getSharedPreferences("UserLoginData",MODE_PRIVATE);
        queue = Volley.newRequestQueue(this);

        fetchusername();

        //starting the background service
        /*alarm alarmhandler=new alarm(this);
        alarmhandler.cancelAlarmManager();
        alarmhandler.setAlarmManager();*/

        signouthandler();
        getlocation_function();
        lastEventInfo_function();
        vehiclestatus_function();
        manageaccount_function();
        customercare_function();
        aboutaas_function();
    }

    public void signouthandler(){
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String url="https://backend-aas.herokuapp.com/api-authlogout/";
                StringRequest stringRequest=new StringRequest(Request.Method.GET, url,new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        SharedPreferences.Editor editlogout=getpreferences.edit();
                        editlogout.remove("email");
                        editlogout.remove("password");
                        editlogout.remove("key");
                        editlogout.apply();

                        Intent login=new Intent(homepage.this,MainActivity.class);
                        startActivity(login);

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(homepage.this,"Something went wrong",Toast.LENGTH_SHORT).show();
                    }
                });


                queue.add(stringRequest);
            }
        });
    }

    public void getlocation_function(){

        getlocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final String gettoken=getpreferences.getString("key","null");

                String url = "https://backend-aas.herokuapp.com/api/rest-auth/user/";
                StringRequest getlocation = new StringRequest(Request.Method.GET, url,
                        new Response.Listener<String>()
                        {
                            @Override
                            public void onResponse(String response) {
                                try {

                                    JSONObject object=new JSONObject(response);
                                    String locationjson=object.getString("vehicle_location");

                                    // Creates an Intent that will load a map of San Francisco
                                    Uri gmmIntentUri = Uri.parse("geo:"+locationjson+"?z=21");
                                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
                                    mapIntent.setPackage("com.google.android.apps.maps");
                                    startActivity(mapIntent);

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        },
                        new Response.ErrorListener()
                        {
                            @Override
                            public void onErrorResponse(VolleyError error) {

                                Toast.makeText(homepage.this,"Something Went Wrong \n Check Your Internet Connection",Toast.LENGTH_SHORT).show();
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

                queue.add(getlocation);



            }
        });
    }

    public void lastEventInfo_function(){
        lasteventinfobutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent lasteventintent=new Intent(getApplicationContext(),lastEvent_activity.class);
                startActivity(lasteventintent);
            }
        });
    }

    public void fetchusername(){

        final String gettoken=getpreferences.getString("key","null");

        String url = "https://backend-aas.herokuapp.com/api/rest-auth/user/";
        StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject object=new JSONObject(response);
                            String jsonfirstname=object.getString("first_name");
                            username.setText(jsonfirstname);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Toast.makeText(homepage.this,"Something Went Wrong \n Check Your Internet Connection",Toast.LENGTH_SHORT).show();
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

        queue.add(getRequest);
    }

    public void vehiclestatus_function(){
        vehiclestatus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent status=new Intent(getApplicationContext(),vehicleStatus_activity.class);
                startActivity(status);
            }
        });
    }

    public void manageaccount_function(){
        manageaccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent manage=new Intent(getApplicationContext(),manageaccount_activity.class);
                startActivity(manage);
            }
        });
    }

    public void customercare_function(){
        helpcare.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:+910123456789"));
                startActivity(intent);
            }
        });
    }

    public void aboutaas_function(){
        aboutaas.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent aboutaasintent=new Intent(getApplicationContext(),aboutaas_activity.class);
                startActivity(aboutaasintent);
            }
        });
    }
}