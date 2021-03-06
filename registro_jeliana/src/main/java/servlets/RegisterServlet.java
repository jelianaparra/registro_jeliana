package servlets;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import controllers.UserController;
import models.Response;
import models.User;
import helpers.Encryptor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@WebServlet(urlPatterns = "/register", name = "Register Servlet")
public class RegisterServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  /*Servlet para registrar usuario*/
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String json =  req.getReader().lines().collect(Collectors.joining());
    Usuario usuario = mapper.readValue(json, Usuario.class);

    usuario.setPassword(Encryptor.getSHA256(usuario.getPass(), usuario.getUsuario().toLowerCase()));

    Response<Usuario> response = UserController.register(usuario);

    res.setStatus(response.getStatus());
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    res.getWriter().print(mapper.writeValueAsString(response));
  }
}






