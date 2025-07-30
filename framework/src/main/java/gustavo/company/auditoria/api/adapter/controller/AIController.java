package gustavo.company.auditoria.api.adapter.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import gustavo.company.auditoria.api.adapter.dto.request.ai.QuestionRequestImpl;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/chat-bot")
public class AIController {
    @Value("${rag.api.url}")
    private String ragApiUrl;

    private final RestTemplate rest = new RestTemplate();

    @PostMapping("/question")
    public ResponseEntity<Map<String, Object>> ask(@RequestBody @Valid QuestionRequestImpl questionRequestImpl) {

        Map<String, String> req = Map.of("question", questionRequestImpl.question());
        // Faz a chamada e recebe o JSON como Map
        Map<String, Object> response = rest.postForObject(ragApiUrl + "/question", req, Map.class);
        // Retorna o mesmo JSON para o cliente
        return ResponseEntity.ok(response);
    }
}
