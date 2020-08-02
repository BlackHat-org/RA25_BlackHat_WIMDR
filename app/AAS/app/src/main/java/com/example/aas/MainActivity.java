package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

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

public class MainActivity extends AppCompatActivity {
    EditText email;
    EditText password;
    Button signin;
    RequestQueue requestQueue;
    SharedPreferences userLogin;
    Intent Homepage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        email=findViewById(R.id.email);
        password=findViewById(R.id.password);
        signin=findViewById(R.id.signin);

        requestQueue= Volley.newRequestQueue(getApplicationContext());
        userLogin=getSharedPreferences("UserLoginData",MODE_PRIVATE);
        Homepage=new Intent(MainActivity.this,homepage.class);

        String savedemail=userLogin.getString("email","null");
        String savedpassword=userLogin.getString("password","null");
        String savedtoken=userLogin.getString("key","null");

        if(savedemail!="null" && savedpassword!="null" && savedtoken!="null"){
            startActivity(Homepage);
        }
        else{
            login();
        }
    }

    public void login(){
        signin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                final String uemail=email.getText().toString();
                final String upassword=password.getText().toString();

                String url="https://backend-aas.herokuapp.com/api/rest-auth/login/";

                StringRequest stringRequest=new StringRequest(Request.Method.POST, url,new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject object=new JSONObject(response);
                            String obtainedtoken=object.getString("key");

                            SharedPreferences.Editor edit=userLogin.edit();
                            edit.putString("email",uemail);
                            edit.putString("password",upassword);
                            edit.putString("key",obtainedtoken);
                            edit.apply();

                            startActivity(Homepage);

                        }catch (JSONException e){
                            e.printStackTrace();
                        }

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this,"Something went wrong"+"\n"+"1 : Check your internet connection"+"\n"+"2 : Check your Email/Password",Toast.LENGTH_SHORT).show();
                    }
                }){
                    @Override
                    protected Map<String,String> getParams(){
                        Map<String,String> params = new HashMap<String, String>();
                        params.put("email",uemail);
                        params.put("password",upassword);

                        return params;
                    }

                };

                requestQueue.add(stringRequest);
            }
        });
    }
}