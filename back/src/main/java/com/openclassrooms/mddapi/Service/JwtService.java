package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${SECRET_KEY}")
    private String SECRET_KEY;
    //private String SECRET_KEY = "798d97bad82ae937ef5af3529b7c2843f70473d40e068145631f7bd838044b55";

    //Generate token
    public String generateToken(User user){
        String token = Jwts.builder()
                .subject(String.valueOf(user.getId()))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                .signWith(getSigninKey())
                .compact();
        return token;
    }
    public String generateTokens(String emailOrUsername){
        String token = Jwts.builder()
                .subject(emailOrUsername)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                .signWith(getSigninKey())
                .compact();
        return token;
    }
    //Extract claim from token
    public <T> T extractClaim(String token, Function<Claims,T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
    //Extract username from token
    public String extractUserName(String token){
        return extractClaim(token,Claims::getSubject);
    }
    //Extract user ID from token (instead of username)
    public Long extractUserId(String token){
        return Long.parseLong(extractClaim(token, Claims::getSubject));  // Convertir en Long
    }
    //Verify the token validity with username and expiration
    public boolean isValid(String token, long id){
        //String username = extractUserName(token);
        //return (username.equals(user.getUsername())) && !isTokenExpired(token);
        long userId = extractUserId(token);
        return (userId == id && !isTokenExpired(token));
    }

    //Verify the token expiration limit
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //Extract expiration from token
    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    //Convert base64 secret key to hmac key
    private SecretKey getSigninKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    //Extract claims from token
    private Claims extractAllClaims(String token){
        return Jwts.parser().verifyWith(getSigninKey()).build().parseSignedClaims(token).getPayload();
    }
}
