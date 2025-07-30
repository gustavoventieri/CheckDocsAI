package gustavo.company.auditoria.api.adapter.mapper;

import gustavo.company.auditoria.api.entity.User;
import gustavo.company.entity.UserDomain;

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
