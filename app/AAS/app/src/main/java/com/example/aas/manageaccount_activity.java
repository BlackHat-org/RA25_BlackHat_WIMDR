package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.ImageRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class manageaccount_activity extends AppCompatActivity {
    TextView nameview;
    TextView emailview;
    TextView nativeview;
    TextView phonenoview;
    TextView dobview;
    TextView addressview;
    TextView vehicleview;
    TextView cityview;
    TextView zipview;
    ImageView profilephoto;

    RequestQueue requestQueue;
    SharedPreferences getpreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manageaccount_activity);

        nameview=findViewById(R.id.text1_z);
        emailview=findViewById(R.id.text2_z);
        nativeview=findViewById(R.id.text3_z);
        phonenoview=findViewById(R.id.text4_z);
        dobview=findViewById(R.id.text5_z);
        addressview=findViewById(R.id.text6_z);
        vehicleview=findViewById(R.id.text7_z);
        cityview=findViewById(R.id.text8_z);
        zipview=findViewById(R.id.text9_z);
        profilephoto=findViewById(R.id.profilephoto);

        requestQueue= Volley.newRequestQueue(this);
        getpreferences=getSharedPreferences("UserLoginData",MODE_PRIVATE);

        fetchData();
    }

    public void fetchData(){
        final String gettoken=getpreferences.getString("key","null");

        String url = "https://backend-aas.herokuapp.com/api/rest-auth/user/";
        StringRequest getRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>()
                {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject object=new JSONObject(response);
                            String firstname=object.getString("first_name");
                            String lastname=object.getString("last_name");
                            String email=object.getString("email");
                            String nativenamejson=object.getString("native_name");
                            String phonejson=object.getString("phone_no");
                            String dobjson=object.getString("dob");
                            String addressjson=object.getString("address");
                            String vehiclejson=object.getString("vehicle");
                            String cityjson=object.getString("city");
                            String zipjson=object.getString("zip");
                            String photourl=object.getString("photo");

                            nameview.setText(firstname+" "+lastname);
                            emailview.setText(email);
                            nativeview.setText(nativenamejson);
                            phonenoview.setText(phonejson);
                            dobview.setText(dobjson);
                            addressview.setText(addressjson);
                            vehicleview.setText(vehiclejson);
                            cityview.setText(cityjson);
                            zipview.setText(zipjson);

                            fetchprofilephoto(photourl,gettoken);


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener()
                {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Toast.makeText(manageaccount_activity.this,"Something Went Wrong \n Check Your Internet Connection",Toast.LENGTH_SHORT).show();
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

    public void fetchprofilephoto(String photourl, final String gettoken){

        String url = "https://randomuser.me/api/portraits/lego/2.jpg";

        ImageRequest request = new ImageRequest(url,
                new Response.Listener<Bitmap>() {
                    @Override
                    public void onResponse(Bitmap bitmap) {
                        profilephoto.setImageBitmap(bitmap);

                    }
                }, 0, 0, ImageView.ScaleType.CENTER_CROP, Bitmap.Config.RGB_565,
                new Response.ErrorListener() {
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(manageaccount_activity.this,"Failed To Fetch Profile Photo",Toast.LENGTH_SHORT).show();
                    }
                })/*{
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String>  params = new HashMap<String, String>();

                params.put("Authorization", "Token"+" "+gettoken);

                return params;
            }
        }*/;
        requestQueue.add(request);
    }
}