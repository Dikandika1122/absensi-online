import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, CardFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Mahasiswa extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('mahasiswa');
    this.unsubscribe = null;
    this.state = {
      dataMahasiswa: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const dataMahasiswa = [];
    querySnapshot.forEach((doc) => {
      const { nim, nama } = doc.data();
      dataMahasiswa.push({
        key: doc.id,
        doc, // DocumentSnapshot
        nim,
        nama
      });
    });
    this.setState({
      dataMahasiswa
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Search</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-nis">Nis</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="hf-nis" name="hf-nis" placeholder="Masukkan Nis..." autoComplete="nis" onChange={this.onChangeSearch} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-nama">Nama</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="hf-nama" name="hf-nama" placeholder="Masukkan Nama..." autoComplete="current-nama" onChange={this.onChangeSearch}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.loadData}><i className="fa fa-dot-circle-o"></i> Cari</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Data Mahasiswa
                  <div style={{float:'right'}}>
                    <Link to={'/mahasiswa/form'}><Button  color="success"><i className="fa fa-plus"></i> Add</Button></Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <Table responsive striped>
                    <thead>
                    <tr>
                      <th>NIM</th>
                      <th>NAMA</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.dataMahasiswa.map(dataMahasiswa =>
                      <tr key={dataMahasiswa.nis}>
                        <td>{dataMahasiswa.nim}</td>
                        <td>{dataMahasiswa.nama}</td>
                      </tr>
                    )}
                    </tbody>
                  </Table>
                  <Pagination>
                    <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

    );
  }
}

export default Mahasiswa;
