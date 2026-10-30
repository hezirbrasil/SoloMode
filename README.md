# Workout Fight — Solo Builder

Construtor independente de aulas no formato Solo. O projeto não contém cronômetro de execução nem Modo Duo.

## Funcionalidades
- Banco de exercícios inicial com 27 movimentos fornecidos na especificação.
- Cadastro, edição, remoção, pesquisa e filtros por modalidade e grupamento.
- Aulas Full Body e Leg Blast.
- Blocos individuais com execução e descanso.
- Exercícios personalizados restritos à aula atual.
- Seleção múltipla, padronização de tempos, junção de blocos, grupos, recolher/expandir, desagrupar, duplicar e reordenar.
- Script simplificado e impressão.
- Salvamento local, aulas salvas, duplicação, renomeação, importação e exportação JSON.
- Interface responsiva com estética preta e roxo neon.

## Executar localmente
Como o aplicativo usa módulos ES, sirva a pasta por um servidor HTTP simples. Por exemplo:

```bash
python3 -m http.server 8000
```

Acesse http://localhost:8000.

## Testes
Requer Node.js 18 ou superior:

```bash
npm test
```

## Persistência
O banco, a aula atual e as aulas salvas são mantidos no LocalStorage do navegador. Faça exportações JSON periódicas para backup. O armazenamento é local ao navegador/dispositivo; sincronização entre dispositivos não está implementada.

## Observações
- O banco inicial preserva os nomes fornecidos.
- Stiff unilateral E e D foram tratados como par obrigatório: o primeiro lado só pode ser adicionado quando o outro já estiver na aula, permitindo completar os dois lados.
- O sistema não cria exercícios automaticamente para completar uma modalidade.
- Aplicativo independente do Workout Round Timer e do Modo Duo.
