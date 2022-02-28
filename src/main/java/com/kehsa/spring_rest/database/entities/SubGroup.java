package com.kehsa.spring_rest.database.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sub_groups")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode
public class SubGroup {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private boolean deleted;
    @ManyToOne
    private Group group;
    @OneToMany(mappedBy = "subGroup")
    private List<Good> goods;

    @PostLoad
    private void postLoad() {
        goods.removeIf(Good::isDeleted);
    }
}