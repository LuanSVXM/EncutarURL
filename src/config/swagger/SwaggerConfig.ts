import Config from "@config";
import getEnvironments from "@environment";


const SwaggerConfig = () => {
  const URL_SERVER = `${getEnvironments().baseURl}${Config().PORT}`;
  return {
    openapi: "3.0.1",
    info: {
      title: "Encurtador De Urls",
      description: "Documentação de uso da api",
      version: "1.0.0",
      contact: {
        email: "luansv123@gmail.com",
      },
    },
    servers: [
      {
        url: `${URL_SERVER}`,
        description: "API DE TESTE",
      },
    ],
    basePath: "/",
    paths: {
      "/{short_id}": {
        get: {
          tags: ["Cut URL"],
          summary: "Acessar url encurtada",
          description:
            "Rota para redirecionar cliente <br> <b> OBS: Não funciona no swagger, utilizar no navegador </b>",
          parameters: [
            {
              name: "short_id",
              in: "path",
              required: true,
              description: "id de redirecionamento",
              schema: {
                type: "string",
                example: "GxHsld",
              },
            },
          ],
          responses: {
            "404": {
              description: "Pagina não encontrada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "200": {
              description: "Acess",
              content: {
                "text/html": {
                  schema: {
                    type: "string",
                    example: "<html></html>",
                  },
                },
              },
            },
          },
        },
      },
      "/cut": {
        post: {
          tags: ["Cut URL"],
          summary: "Encurtar Url",
          description: "Rota para encurtar url",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                    },
                  },
                  example: {
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  },
                },
              },
            },
          },
          responses: {
            "401": {
              description: "Url inválida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "201": {
              description: "Created",
              content: {
                "text/html": {
                  schema: {
                    type: "string",
                    example: "http://localhost:3002/XTW",
                  },
                },
              },
            },
          },
        },
      },
      "/auth": {
        post: {
          tags: ["Authorization"],
          summary: "Autenticação do usuário",
          description: "Rota para usuário logar no sistema.",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                  example: {
                    email: "luansv123@gmail.com",
                    password: "123456",
                  },
                },
              },
            },
          },
          responses: {
            "400": {
              description: "Campos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "401": {
              description: "Senha incorreta",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "404": {
              description: "Usuário não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      token: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/user": {
        post: {
          tags: ["Users"],
          summary: "Criar Usuário",
          description: "Rota para criação de usuário",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    name: {
                      type: true,
                    },
                  },
                  example: {
                    email: "luansv123@gmail.com",
                    password: "123456",
                    name: "Luan Vieira",
                  },
                },
              },
            },
          },
          responses: {
            "400": {
              description: "Campos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "401": {
              description: "Email já está em uso.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "201": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/user/url": {
        get: {
          tags: ["Users Url"],
          summary: "Listar urls do usuário",
          description: "Rota para listar as urls do usuário",
          security: [{ bearerAuth: [] }],
          responses: {
            "400": {
              description: "Campos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "401": {
              description: "Usuário não autenticado.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "404": {
              description: "Usuário não encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "200": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        url: {
                          type: "string",
                        },
                        views: {
                          type: "number",
                        },
                        created_at: {
                          type: "string",
                        },
                        updated_at: {
                          type: "string",
                        },
                        shortURL: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Users Url"],
          summary: "Atualizar url do usuário",
          description: "Rota para atualizar url do usuário",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    url: {
                      type: "string",
                    },
                  },
                  example: {
                    id: "ce778bd8-0312-44b8-98f0-b74f7757d404",
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  },
                },
              },
            },
          },
          responses: {
            "400": {
              description: "Campos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "401": {
              description: "Usuário não autenticado.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "404": {
              description: "Não foi possivel encotrar url",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "403": {
              description: "Sem permissão para alterar essa url.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "200": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      messsage: {
                        type: "string",
                      },
                      hasError: {
                        type: "boolean",
                      },
                    },
                    example: {
                      messsage: "Url atualizado com sucesso!",
                      password: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/user/url/{id}": {
        delete: {
          tags: ["Users Url"],
          summary: "Deleletar url do usuario",
          description: "Rota para remover url encurtada.",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "ID do URL",
              schema: {
                type: "string",
                example: "d264499e-13cc-437f-b97a-fe5d0fea67ac",
              },
            },
          ],
          responses: {
            "400": {
              description: "Não foi possivel encotrar url",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "401": {
              description: "Usuário não autenticado.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "403": {
              description: "Sem permissão para alterar essa url.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "404": {
              description: "Url não encontrada.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "500": {
              description: "Erro interno!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/messageError",
                  },
                },
              },
            },
            "200": {
              description: "Created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      messsage: {
                        type: "string",
                      },
                      hasError: {
                        type: "boolean",
                      },
                    },
                    example: {
                      messsage: "Url deletada com sucesso!",
                      password: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        messageError: {
          type: "object",
          properties: {
            messsage: {
              type: "string",
            },
            hasError: {
              type: "boolean",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };
};


export default SwaggerConfig();