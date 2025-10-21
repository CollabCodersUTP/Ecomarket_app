package eco.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void enviarEmailBienvenida(String email, String nombre) {
        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(email);
            mensaje.setSubject("¡Bienvenido a EcoMarket!");
            mensaje.setText("Hola " + nombre + ",\n\n" +
                    "¡Bienvenido a EcoMarket! Tu cuenta ha sido creada exitosamente.\n" +
                    "Ahora puedes explorar nuestros productos ecológicos y realizar tus compras.\n\n" +
                    "¡Gracias por unirte a nuestra comunidad!\n\n" +
                    "Saludos,\nEl equipo de EcoMarket");
            
            mailSender.send(mensaje);
        } catch (Exception e) {
            System.err.println("Error enviando email: " + e.getMessage());
        }
    }
    
    public void enviarConfirmacionPedido(String email, String nombre, String numeroPedido) {
        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(email);
            mensaje.setSubject("Confirmación de Pedido - EcoMarket");
            mensaje.setText("Hola " + nombre + ",\n\n" +
                    "Tu pedido #" + numeroPedido + " ha sido confirmado exitosamente.\n" +
                    "Te notificaremos cuando tu pedido sea enviado.\n\n" +
                    "¡Gracias por tu compra!\n\n" +
                    "Saludos,\nEl equipo de EcoMarket");
            
            mailSender.send(mensaje);
        } catch (Exception e) {
            System.err.println("Error enviando email: " + e.getMessage());
        }
    }
}