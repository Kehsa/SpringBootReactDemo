package com.kehsa.spring_rest.database.entities;

import com.kehsa.spring_rest.MyUserDetailsService;
import com.kehsa.spring_rest.database.DbLogProvider;
import com.kehsa.spring_rest.database.entities.Log;
import org.springframework.security.core.context.SecurityContextHolder;

public interface LoggedEntity {

    default void log(short table, long entityId, String info) {
        var principal = (MyUserDetailsService.MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var e = new Log();
        e.setTable(table);
        e.setUser(principal.getUser());
        e.setEntity(entityId);
        e.setInfo(info);
        DbLogProvider.logRepository.save(e);
    }

    default void logUpdate() {
        System.err.println("LOG NOT IMPLEMENTED " + this.getClass().getName() );
    }

//    @Transient @JsonIgnore private static final short MY_ID = DbLogProvider.tableLogMap.getInverted("users");
/*    @PostUpdate @Override
    public void logUpdate() {
        this.log(MY_ID, id, "");
    }*/
}
