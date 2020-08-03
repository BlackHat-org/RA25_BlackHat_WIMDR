package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;

public class splashscreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splashscreen);
        new CountDownTimer(1000,1000){
            @Override
            public void onTick(long l) {

            }

            @Override
            public void onFinish() {
                Intent intent=new Intent(splashscreen.this,homepage.class);
                startActivity(intent);
            }
        }.start();
    }
}