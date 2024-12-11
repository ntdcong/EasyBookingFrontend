import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Search, HelpCircle, ChevronRight, ChevronDown } from 'lucide-react';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const helpCategories = [
    {
      title: 'Đặt Chỗ & Thanh Toán',
      icon: '💳',
      items: [
        {
          question: 'Làm thế nào để đặt chỗ trên EasyBooking?',
          answer: 'Bạn có thể dễ dàng đặt chỗ bằng cách chọn địa điểm, ngày, và số lượng khách. Sau đó, chọn chỗ ưng ý và tiến hành thanh toán an toàn. Cung cấp thông tin chi tiết như tên, email và phương thức thanh toán của bạn để hoàn tất quá trình đặt chỗ. Hệ thống sẽ gửi một email xác nhận ngay khi đặt chỗ thành công.'
        },
        {
          question: 'Chính sách hủy đặt chỗ như thế nào?',
          answer: 'Mỗi chỗ ở có chính sách hủy khác nhau. Bạn có thể xem chi tiết tại trang thông tin chỗ ở trước khi đặt. Thông thường, bạn có thể hủy miễn phí trong vòng 24h trước khi đến, nhưng sẽ phải trả một khoản phí nếu hủy sau thời gian đó. Để hủy đặt chỗ, vui lòng truy cập vào trang quản lý đơn hàng trong tài khoản của bạn.'
        },
        {
          question: 'Có thể thanh toán bằng hình thức nào?',
          answer: 'Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay, AirPay), và nhiều hình thức thanh toán trực tuyến khác. Các giao dịch thanh toán đều được mã hóa bảo mật cao để đảm bảo an toàn cho thông tin của bạn.'
        },
        {
          question: 'Thanh toán đã thành công nhưng tôi chưa nhận được xác nhận, phải làm sao?',
          answer: 'Trong trường hợp bạn đã thanh toán nhưng chưa nhận được xác nhận đặt chỗ, hãy kiểm tra lại hộp thư rác hoặc thư mục quảng cáo trong email. Nếu vẫn không thấy, vui lòng liên hệ với chúng tôi qua email support@easybooking.com hoặc số hotline để được hỗ trợ nhanh chóng.'
        }
      ]
    },
    {
      title: 'Hỗ Trợ Khách Hàng',
      icon: '👥',
      items: [
        {
          question: 'Làm sao để liên hệ hỗ trợ?',
          answer: 'Bạn có thể liên hệ với đội ngũ hỗ trợ của chúng tôi qua email support@easybooking.com hoặc hotline 1900-xxxx. Chúng tôi cũng có đội ngũ hỗ trợ trực tuyến qua chat trong trang web, sẵn sàng giải đáp thắc mắc của bạn bất cứ lúc nào.'
        },
        {
          question: 'Thời gian phản hồi như thế nào?',
          answer: 'Chúng tôi cam kết phản hồi trong vòng 24h kể từ khi nhận được yêu cầu hỗ trợ. Trong trường hợp cần thêm thời gian để giải quyết vấn đề phức tạp, đội ngũ của chúng tôi sẽ liên hệ với bạn để cập nhật tiến độ.'
        },
        {
          question: 'Tôi có thể yêu cầu hoàn tiền khi gặp sự cố không?',
          answer: 'Nếu bạn gặp sự cố liên quan đến chất lượng dịch vụ hoặc không hài lòng với chỗ ở, chúng tôi có chính sách hoàn tiền trong phạm vi 7 ngày kể từ ngày check-in. Vui lòng cung cấp đầy đủ thông tin và lý do khi yêu cầu hoàn tiền để được hỗ trợ nhanh chóng.'
        },
        {
          question: 'Có hỗ trợ khách hàng 24/7 không?',
          answer: 'Chúng tôi hỗ trợ khách hàng 24/7 qua các kênh email và chat trực tuyến. Nếu có bất kỳ vấn đề nào phát sinh trong suốt chuyến đi, bạn có thể liên hệ với chúng tôi bất kỳ lúc nào để nhận được sự hỗ trợ kịp thời.'
        }
      ]
    },
    {
      title: 'Tài Khoản & Bảo Mật',
      icon: '🔒',
      items: [
        {
          question: 'Làm sao để tạo tài khoản?',
          answer: 'Bấm vào nút "Đăng Ký" ở góc trên cùng, điền đầy đủ thông tin như tên, email, số điện thoại và mật khẩu. Sau khi đăng ký, hệ thống sẽ gửi email xác nhận đến hộp thư của bạn, vui lòng kiểm tra và xác nhận để hoàn tất quá trình tạo tài khoản.'
        },
        {
          question: 'Chính sách bảo mật của EasyBooking?',
          answer: 'Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo tiêu chuẩn bảo mật quốc tế. Mọi thông tin giao dịch và dữ liệu cá nhân của bạn đều được mã hóa và lưu trữ an toàn. Chúng tôi không chia sẻ thông tin của bạn với bất kỳ bên thứ ba nào mà không có sự đồng ý từ bạn.'
        },
        {
          question: 'Tôi đã quên mật khẩu, làm thế nào để lấy lại?',
          answer: 'Nếu bạn quên mật khẩu, hãy nhấp vào liên kết "Quên mật khẩu" trên trang đăng nhập. Nhập email mà bạn đã đăng ký tài khoản và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu tới email của bạn.'
        },
        {
          question: 'Tài khoản của tôi bị khóa, làm sao để mở khóa?',
          answer: 'Nếu tài khoản của bạn bị khóa, hãy liên hệ với chúng tôi qua email support@easybooking.com. Các lý do khóa tài khoản có thể là vi phạm các điều khoản dịch vụ hoặc phát hiện hành vi đáng ngờ. Đội ngũ hỗ trợ của chúng tôi sẽ làm việc với bạn để xác minh thông tin và mở khóa tài khoản.'
        }
      ]
    }
  ];
  

  const filteredCategories = helpCategories.filter(category => 
    category.items.some(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <Container className="help-page py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">Trung Tâm Trợ Giúp EasyBooking</h1>
          <InputGroup className="mx-auto" style={{ maxWidth: '600px' }}>
            <Form.Control
              type="text"
              placeholder="Bạn cần trợ giúp gì?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-pill pl-4"
            />
            <InputGroup.Text className="bg-transparent border-0">
              <Search color="#007bff" size={24} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Danh Mục Trợ Giúp</h5>
              {helpCategories.map((category, index) => (
                <div 
                  key={index} 
                  className={`d-flex align-items-center p-3 mb-2 rounded cursor-pointer ${activeCategory === index ? 'bg-light' : ''}`}
                  onClick={() => toggleCategory(index)}
                >
                  <span className="mr-3 h3 mb-0">{category.icon}</span>
                  <span className="flex-grow-1">{category.title}</span>
                  {activeCategory === index ? <ChevronDown /> : <ChevronRight />}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Accordion defaultActiveKey="0">
            {filteredCategories.map((category, catIndex) => (
              <Card key={catIndex} className="mb-3 border-0 shadow-sm">
                <Card.Header className="bg-white d-flex align-items-center">
                  <span className="h3 mr-3 mb-0">{category.icon}</span>
                  <h4 className="mb-0">{category.title}</h4>
                </Card.Header>
                <Card.Body>
                  {category.items.map((item, itemIndex) => (
                    <Accordion.Item 
                      key={itemIndex} 
                      eventKey={`${catIndex}-${itemIndex}`}
                      className="mb-2"
                    >
                      <Accordion.Header>{item.question}</Accordion.Header>
                      <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </Accordion>

          {filteredCategories.length === 0 && (
            <div className="text-center py-5">
              <HelpCircle size={64} color="#007bff" className="mb-3" />
              <p className="text-muted">Không tìm thấy kết quả. Hãy thử từ khóa khác.</p>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="text-center">
          <h4>Vẫn cần hỗ trợ?</h4>
          <p>Liên hệ với chúng tôi qua email: support@easybooking.com</p>
          <Button variant="primary" className="rounded-pill px-4">
            Gửi Yêu Cầu Hỗ Trợ
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpPage;
