package com.kehsa.spring_rest.database.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "groups_")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class Group {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private boolean deleted;
    @OneToMany(mappedBy = "group")
    private List<SubGroup> subGroups;

    @PostLoad
    private void postLoad() {
        subGroups.removeIf(SubGroup::isDeleted);
    }

}