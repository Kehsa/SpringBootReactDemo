package com.kehsa.spring_rest.database;

import com.kehsa.spring_rest.BiMap;
import com.kehsa.spring_rest.Pair;
import com.kehsa.spring_rest.database.repositories.LogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbLogProvider {
    public static LogRepository logRepository;
    private final LogRepository logRepository_;

    public DbLogProvider(LogRepository logRepository) {
        this.logRepository_ = logRepository;
        DbLogProvider.logRepository = logRepository;
    }

    public LogRepository getLogRepository() {
        return logRepository_;
    }

    public static BiMap<Short, String> tableLogMap = new BiMap<>( List.of(
            new Pair<>((short)1, "users"),
            new Pair<>((short)2, "groups"),
            new Pair<>((short)3, "subgroups"),
            new Pair<>((short)4, "goods")
    ));
}