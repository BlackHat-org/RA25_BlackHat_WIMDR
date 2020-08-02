package com.example.aas;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;

public class Alertclass extends AppCompatActivity {
    MediaPlayer player;
    Button exit;
    Button openaas;
    AudioManager am;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alertclass);

        exit=findViewById(R.id.button8);
        openaas=findViewById(R.id.button9);

        //getting current volume of system
        am=(AudioManager)getSystemService(AUDIO_SERVICE);
        int current_volume = am.getStreamVolume(AudioManager.STREAM_MUSIC);
        int max = am.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
        setbuttons(current_volume);
        playalert(max);

        //to show on lock screen code
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN |
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON,
                WindowManager.LayoutParams.FLAG_FULLSCREEN |
                        WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED |
                        WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
    }

    public void playalert(int max){
        player=MediaPlayer.create(this,R.raw.alertsound);
        player.start();

        am.setStreamVolume(AudioManager.STREAM_MUSIC, max, 0);
        player.setLooping(true);
    }

    public void setbuttons(final int current_volume){

        exit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                am.setStreamVolume(AudioManager.STREAM_MUSIC, current_volume,0 );
                player.stop();
                finish();
                System.exit(0);
            }
        });

        openaas.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                am.setStreamVolume(AudioManager.STREAM_MUSIC, current_volume, 0);
                player.stop();
                Intent intent=new Intent(getApplicationContext(),homepage.class);
                startActivity(intent);
            }
        });
    }
}