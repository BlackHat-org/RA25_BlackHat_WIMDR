package com.example.aas;

import android.annotation.SuppressLint;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;

public class alarm {
    private Context context;

    public alarm(Context context) {
        this.context = context;
    }
    @SuppressLint("ShortAlarm")
    public void setAlarmManager(){
        Intent intent=new Intent(context,executable.class);
        PendingIntent sender=PendingIntent.getBroadcast(context,2,intent,0);
        AlarmManager am=(AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if(am!=null){
            long setinterval=1000*60;
            long startat= SystemClock.elapsedRealtime();
            startat+=3*1000;
            am.setInexactRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP,startat,setinterval,sender);
        }
    }
    public void cancelAlarmManager(){
        Intent intent=new Intent(context,executable.class);
        PendingIntent sender=PendingIntent.getBroadcast(context,2,intent,0);
        AlarmManager am=(AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if(am!=null){
            am.cancel(sender);
        }
    }
}
