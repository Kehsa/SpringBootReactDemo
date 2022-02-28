package com.kehsa.spring_rest.database.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kehsa.spring_rest.database.DbLogProvider;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;

@Entity
@Table(name = "spring_log")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class Log {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @RestResource(exported = false)
    @ManyToOne
    private User user;
    private long entity;
    private String info = "";
    @Column(name = "table_id")
    @JsonIgnore private short table;
    @Transient private String tableName;

    @PostLoad
    private void initTable() {
        tableName = DbLogProvider.tableLogMap.get(table);
    }
}
