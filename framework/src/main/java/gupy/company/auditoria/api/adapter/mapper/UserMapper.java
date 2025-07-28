package gupy.company.auditoria.api.adapter.mapper;

import gupy.company.auditoria.api.entity.User;
import gupy.company.entity.UserDomain;

public class UserMapper {

    public static UserDomain toDomain(User user) {

        return new UserDomain(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPassword(),
            user.getCreatedAt()
        );
    }

    public static User toEntity(UserDomain domain) {

        return new User(
            domain.id(),
            domain.name(),
            domain.email(),
            domain.password(),
            domain.createdAt()
        );
    }
}
