package gupy.company.utils;

import java.util.UUID;

import gupy.company.entity.UserDomain;
import gupy.company.exception.JWTException;
import jakarta.servlet.http.HttpServletRequest;

public interface JWTUtils {

    String generateUserToken(UserDomain user);

    String validateAndExtractUserId(String token);

    UUID getUserIdFromCookie(HttpServletRequest request) throws JWTException;
}