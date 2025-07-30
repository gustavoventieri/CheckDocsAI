package gustavo.company.auditoria.api.adapter.dto.request.ai;

import jakarta.validation.constraints.NotBlank;

public record QuestionRequestImpl(
        @NotBlank(message = "question cannot be empty.") String question) {

}
