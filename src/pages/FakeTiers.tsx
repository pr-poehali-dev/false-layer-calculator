import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface TierItem {
  id: string;
  diameter: number;
  height: number;
  quantity: number;
  price: number;
}

interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export default function FakeTiers() {
  const [diameter, setDiameter] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<TierItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  // Расчёт цены для фальш яруса
  const calculatePrice = () => {
    if (!diameter || !height) return 0;
    
    const d = parseFloat(diameter);
    const h = parseFloat(height);
    
    // Формула для фальш ярусов: диаметр × высота × коэффициент × количество
    const basePrice = 50; // базовая цена за см²
    const price = Math.ceil(d * h * basePrice * quantity);
    
    return Math.max(price, 200); // минимальная стоимость 200₽
  };

  const addToCart = () => {
    if (diameter && height) {
      const newItem: TierItem = {
        id: Date.now().toString(),
        diameter: parseFloat(diameter),
        height: parseFloat(height),
        quantity,
        price: calculatePrice()
      };
      
      setCart([...cart, newItem]);
      setDiameter('');
      setHeight('');
      setQuantity(1);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderDetails = cart.map(item => 
      `• Диаметр: ${item.diameter}см, Высота: ${item.height}см - ${item.quantity} шт. - ${item.price.toLocaleString()} ₽`
    ).join('\n');
    
    const totalAmount = getTotalPrice();
    
    const emailBody = `НОВЫЙ ЗАКАЗ ФАЛЬШ ЯРУСОВ ОТ GRIGORENKO_CAKES

КЛИЕНТ:
Имя: ${orderData.name}
Телефон: ${orderData.phone}
Email: ${orderData.email}
Адрес: ${orderData.address}
Город: ${orderData.city}

ЗАКАЗ:
${orderDetails}

ОБЩАЯ СУММА: ${totalAmount.toLocaleString()} ₽

КОММЕНТАРИЙ:
${orderData.notes || 'Нет'}`;
    
    try {
      const mailtoLink = `mailto:mtelsv@bk.ru?subject=Новый заказ фальш ярусов Grigorenko_cakes&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
      
      setCart([]);
      setOrderData({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
      setShowOrderForm(false);
      
      alert('Заказ отправлен! Мы свяжемся с вами в ближайшее время.');
    } catch (error) {
      alert('Ошибка отправки. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              G
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Grigorenko Cakes
              </h1>
              <p className="text-sm text-gray-600">Фальш ярусы для тортов</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <Icon name="Cake" size={20} />
              Подложки
            </Link>
            <Button 
              onClick={() => setShowOrderForm(true)}
              disabled={cart.length === 0}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Корзина ({cart.length})
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Калькулятор фальш ярусов
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Рассчитайте стоимость фальш ярусов для вашего торта
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-700">Параметры фальш яруса</CardTitle>
                <CardDescription>
                  Укажите диаметр и высоту яруса
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diameter">Диаметр (см)</Label>
                    <Input
                      id="diameter"
                      type="number"
                      min="5"
                      max="50"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      placeholder="Например: 20"
                      className="text-center"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Высота (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="3"
                      max="15"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Например: 8"
                      className="text-center"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Количество</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="text-center"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="text-lg font-semibold text-purple-700">
                    Стоимость:
                  </span>
                  <Badge variant="secondary" className="text-xl px-4 py-2 bg-purple-100 text-purple-800">
                    {calculatePrice().toLocaleString()} ₽
                  </Badge>
                </div>

                <Button 
                  onClick={addToCart}
                  disabled={!diameter || !height}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>

            {/* Cart */}
            <Card className="border-2 border-pink-100">
              <CardHeader>
                <CardTitle className="text-pink-700 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} />
                  Корзина
                </CardTitle>
                <CardDescription>
                  {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Добавьте фальш ярусы в корзину</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">
                            Ø{item.diameter}см × {item.height}см
                          </p>
                          <p className="text-sm text-gray-600">
                            Количество: {item.quantity} шт.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-pink-100 text-pink-800">
                            {item.price.toLocaleString()} ₽
                          </Badge>
                          <Button
                            onClick={() => removeFromCart(item.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between p-4 bg-pink-100 rounded-lg">
                      <span className="text-lg font-bold text-pink-800">
                        Итого:
                      </span>
                      <Badge className="text-xl px-4 py-2 bg-pink-200 text-pink-900">
                        {getTotalPrice().toLocaleString()} ₽
                      </Badge>
                    </div>
                    
                    <Button
                      onClick={() => setShowOrderForm(true)}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white h-12"
                    >
                      <Icon name="Send" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pricing Info */}
          <Card className="mt-8 border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <Icon name="Info" size={24} />
                Информация о фальш ярусах
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Что такое фальш ярус?</h4>
                  <p className="text-gray-600 mb-4">
                    Фальш ярус — это декоративная основа из пенопласта, 
                    покрытая мастикой или кремом. Создаёт объём торта без лишнего веса.
                  </p>
                  
                  <h4 className="font-semibold mb-3 text-blue-600">Преимущества:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Экономия на ингредиентах</li>
                    <li>• Лёгкий вес торта</li>
                    <li>• Идеальная форма</li>
                    <li>• Долговечность</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Расчёт стоимости:</h4>
                  <p className="text-gray-600 mb-4">
                    Цена рассчитывается по формуле: диаметр × высота × 50₽
                  </p>
                  
                  <h4 className="font-semibold mb-3 text-blue-600">Популярные размеры:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-blue-50 rounded">Ø20см × 8см</div>
                    <div className="p-2 bg-blue-50 rounded">Ø25см × 10см</div>
                    <div className="p-2 bg-blue-50 rounded">Ø30см × 8см</div>
                    <div className="p-2 bg-blue-50 rounded">Ø35см × 10см</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Оформление заказа
                <Button
                  onClick={() => setShowOrderForm(false)}
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="X" size={20} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order-name">Имя *</Label>
                  <Input
                    id="order-name"
                    type="text"
                    required
                    value={orderData.name}
                    onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-phone">Телефон *</Label>
                  <Input
                    id="order-phone"
                    type="tel"
                    required
                    value={orderData.phone}
                    onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-email">Email</Label>
                  <Input
                    id="order-email"
                    type="email"
                    value={orderData.email}
                    onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-address">Адрес *</Label>
                  <Input
                    id="order-address"
                    type="text"
                    required
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-city">Город *</Label>
                  <Input
                    id="order-city"
                    type="text"
                    required
                    value={orderData.city}
                    onChange={(e) => setOrderData({...orderData, city: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-notes">Комментарий</Label>
                  <textarea
                    id="order-notes"
                    className="w-full p-3 border border-gray-300 rounded-md resize-none"
                    rows={3}
                    value={orderData.notes}
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    placeholder="Особые пожелания к заказу..."
                  />
                </div>

                <Separator />

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Ваш заказ:</h4>
                  {cart.map((item, index) => (
                    <div key={item.id} className="text-sm text-gray-600">
                      {index + 1}. Ø{item.diameter}см × {item.height}см - {item.quantity} шт. - {item.price.toLocaleString()} ₽
                    </div>
                  ))}
                  <div className="font-semibold mt-2 pt-2 border-t">
                    Итого: {getTotalPrice().toLocaleString()} ₽
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заказ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}