import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0
  });
  
  const [material, setMaterial] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  
  const calculatePrice = () => {
    const basePrice = 150;
    const area = (dimensions.width * dimensions.height) / 10000; // конвертация в кв.м
    const volume = (dimensions.width * dimensions.height * dimensions.depth) / 1000000; // в куб.м
    
    const materialMultiplier = material === 'premium' ? 1.5 : material === 'economy' ? 0.8 : 1;
    const totalPrice = basePrice * area * volume * materialMultiplier * quantity;
    
    return Math.round(totalPrice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" className="text-primary" size={32} />
              <h1 className="text-2xl font-heading font-bold text-gray-900">ФальшЯрус</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
              <a href="#calculator" className="text-gray-700 hover:text-primary transition-colors">Калькулятор</a>
              <a href="#portfolio" className="text-gray-700 hover:text-primary transition-colors">Портфолио</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors">О нас</a>
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
            </div>
            
            <Button className="bg-primary hover:bg-orange-600 text-white">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Профессиональное изготовление
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 mb-6">
                Фальш ярусы
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {' '}высочайшего качества
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Создаем архитектурные решения любой сложности. 
                Современные технологии, точные расчеты, быстрая установка.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-orange-600 text-white px-8">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть портфолио
                </Button>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <img 
                src="/img/c392ca96-cedc-4eb5-bc8d-7d4fa09b727a.jpg" 
                alt="Строительные работы" 
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Калькулятор стоимости</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Рассчитайте стоимость вашего заказа
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Укажите размеры и характеристики изделия для получения точной стоимости
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center text-2xl">
                  <Icon name="Calculator" className="mr-3 text-primary" />
                  Калькулятор размеров и стоимости
                </CardTitle>
                <CardDescription className="text-base">
                  Введите параметры изделия для расчета точной стоимости
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="width" className="text-base font-medium">Ширина (мм)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={dimensions.width || ''}
                        onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                        placeholder="1000"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="height" className="text-base font-medium">Высота (мм)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={dimensions.height || ''}
                        onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
                        placeholder="2500"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="depth" className="text-base font-medium">Глубина (мм)</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={dimensions.depth || ''}
                        onChange={(e) => setDimensions({...dimensions, depth: Number(e.target.value)})}
                        placeholder="200"
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">Материал</Label>
                      <Tabs value={material} onValueChange={setMaterial} className="mt-2">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="economy">Эконом</TabsTrigger>
                          <TabsTrigger value="standard">Стандарт</TabsTrigger>
                          <TabsTrigger value="premium">Премиум</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div>
                      <Label htmlFor="quantity" className="text-base font-medium">Количество</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                      Расчет стоимости
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Площадь:</span>
                        <span className="font-semibold">
                          {((dimensions.width * dimensions.height) / 10000).toFixed(2)} м²
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Объем:</span>
                        <span className="font-semibold">
                          {((dimensions.width * dimensions.height * dimensions.depth) / 1000000).toFixed(3)} м³
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Материал:</span>
                        <Badge variant="secondary">
                          {material === 'economy' ? 'Эконом' : material === 'premium' ? 'Премиум' : 'Стандарт'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Количество:</span>
                        <span className="font-semibold">{quantity} шт.</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold text-gray-900">Итого:</span>
                        <span className="text-3xl font-bold text-primary">
                          {calculatePrice().toLocaleString()} ₽
                        </span>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-orange-600 text-white h-12 text-lg">
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-accent/10 text-accent">Наши услуги</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Полный цикл работ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              От проектирования до монтажа - предоставляем комплексные решения
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'Ruler', title: 'Замеры', desc: 'Точные замеры на объекте' },
              { icon: 'PenTool', title: 'Проектирование', desc: '3D визуализация проекта' },
              { icon: 'Factory', title: 'Производство', desc: 'Изготовление по чертежам' },
              { icon: 'Wrench', title: 'Монтаж', desc: 'Профессиональная установка' }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary">Портфолио</Badge>
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Наши лучшие работы
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Более 500 успешно реализованных проектов различной сложности
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon name="Image" size={48} className="text-primary opacity-50" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-2">Проект #{item}</h3>
                  <p className="text-gray-600 mb-4">
                    Описание выполненных работ по изготовлению фальш ярусов
                  </p>
                  <Badge variant="outline">Завершен</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-secondary/10 text-secondary">О компании</Badge>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">
                15 лет опыта в строительстве
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Мы специализируемся на изготовлении фальш ярусов любой сложности. 
                Наша команда профессионалов использует только качественные материалы 
                и современное оборудование.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-gray-600">Проектов</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-3xl font-bold text-secondary mb-2">15</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
              </div>
              
              <Button className="bg-secondary hover:bg-blue-600 text-white">
                <Icon name="Users" size={20} className="mr-2" />
                Познакомиться с командой
              </Button>
            </div>
            
            <div className="animate-slide-up">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-3xl">
                <Icon name="Award" size={64} className="text-primary mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">Гарантия качества</h3>
                <p className="text-gray-600">
                  Предоставляем 5 лет гарантии на все виды работ. 
                  Используем только сертифицированные материалы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-white">Контакты</Badge>
            <h2 className="text-4xl font-heading font-bold mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Готовы обсудить ваш проект и предоставить бесплатную консультацию
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: 'Phone', title: 'Телефон', info: '+7 (999) 123-45-67' },
              { icon: 'Mail', title: 'Email', info: 'info@falshyarus.ru' },
              { icon: 'MapPin', title: 'Адрес', info: 'г. Москва, ул. Строителей, 15' }
            ].map((contact, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={contact.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{contact.title}</h3>
                  <p className="text-gray-300">{contact.info}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-orange-600 text-white px-8">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Начать проект
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Building2" className="text-primary" size={24} />
              <span className="text-xl font-heading font-bold text-white">ФальшЯрус</span>
            </div>
            
            <p className="text-center md:text-right">
              © 2024 ФальшЯрус. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;