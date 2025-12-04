🍽️ Aplicativo de Cardápio Digital – MyFoodJf

Este repositório contém o código-fonte de um aplicativo mobile desenvolvido para facilitar a navegação, consulta e descoberta de pratos de um restaurante. O projeto utiliza conceitos modernos de desenvolvimento mobile, consumo de API externa, armazenamento local e navegação integrada.

📱 Interfaces Desenvolvidas
1. Tela de Início – WelcomeScreen

Tela inicial que apresenta a identidade visual do app de forma limpa e objetiva.
Possui:

Botão principal: “Ver Cardápio”

Acesso direto ao Menu Lateral (Drawer Navigation)
Objetivo: introduzir o usuário ao app de maneira simples e visualmente agradável.

2. Cardápio Principal – HomeScreen

A principal vitrine do aplicativo.
Funcionalidades:

Consumo de API REST externa para exibir a Curiosidade do Dia
→ conteúdo dinâmico atualizado a cada acesso.

Lista completa de produtos (Marmitex, Fitness, Bolos)

Cada item apresenta:

Foto ilustrativa

Título

Categoria

Preço

3. Detalhes do Prato – DetailScreen

Tela aberta ao selecionar um produto.
Recursos:

Imagem em destaque em alta definição

Descrição completa do prato

Preço unitário

Favoritar prato (persistência local com AsyncStorage)

Interatividade avançada:

O usuário pode clicar em cada ingrediente

Esses ingredientes podem ser salvos para formar uma lista personalizada de insumos

4. Localização – MapScreen

Tela que exibe o local do restaurante para retirada dos pedidos.
Tecnologias utilizadas:

WebView integrada ao Leaflet

Mapa interativo centralizado nas coordenadas do estabelecimento

Marcador personalizado indicando o ponto exato

5. Meus Favoritos – FavoritesScreen

Tela que concentra todos os itens salvos pelo usuário.
Utiliza AsyncStorage para persistência de dados.
Organizada em duas abas:

📌 Receitas

Lista de pratos favoritados

Exibidos com miniaturas (thumbnails)

Acesso rápido aos detalhes do prato

📌 Ingredientes

Lista de ingredientes favoritados

Função de “busca reversa”:
→ Ao clicar em um ingrediente, o app exibe todas as receitas que o utilizam

6. Busca por Ingrediente – IngredientMatchesScreen

Tela dedicada aos resultados da busca reversa iniciada em Ingredientes.
Permite ao usuário descobrir novos pratos com base nos insumos que ele mais gosta.

7. Sobre o App – AboutScreen

Tela acessível pelo menu lateral com informações institucionais do projeto.
Inclui:

Contexto do desenvolvimento

Objetivos do aplicativo

Créditos e informações gerais

🧰 Tecnologias Utilizadas

React Native

React Navigation (Drawer, Stack, Tabs)

WebView

Leaflet (via WebView)

AsyncStorage

Consumo de API REST externa

Componentização e reutilização de UI

🚀 Objetivo Geral do Projeto

Criar uma experiência completa para o usuário, unindo descoberta de pratos, favoritos personalizáveis e acesso fácil às informações do restaurante — tudo em uma interface moderna, interativa e eficiente.