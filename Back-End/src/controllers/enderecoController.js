import enderecoModel from "../models/enderecoModel.js";

class EnderecoController {
  async createEndereco(req, res) {
    const { cep } = req.body;

    if (!cep) {
      return res.status(400).json({
        error: "CEP não fornecido!",
      });
    }

    const [selectEnderecoByCep] = await enderecoModel.selectEnderecoByCep(cep);

    if (selectEnderecoByCep) {
      return res.status(400).json({
        error: "Endereço já cadastarado!",
      });
    }

    const getEndereco = await fetch(`http://viacep.com.br/ws/${cep}/json/`);

    const jsonEndereco = await getEndereco.json();

    const newEndereco = {
        id_cliente: 2,
        rua: jsonEndereco.logradouro,
        numero: "",
        complemento: "",
        bairro: jsonEndereco.bairro,
        cidade: jsonEndereco.localidade,
        estado: jsonEndereco.uf,
        cep,
      }
  

    return res.status(200).json({
      endereco: newEndereco,
    });
  }
}
export default new EnderecoController();
