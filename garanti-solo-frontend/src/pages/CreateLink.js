import React, { useState } from 'react';
import { createLinks } from "../services/api"; 

const CreateLink = () => {
    const [formData, setFormData] = useState({
        clientName: '',
        amount: '',
        projectDescription: ''
    });
    
    const [generatedLink, setGeneratedLink] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setGeneratedLink('');

        try {
            // Backend'e isteği atıyoruz
            const response = await createLinks(formData);
            const newId = response.data.id; 
            const fakeUrl = `https://garanti-solo.com/pay/${newId}`;

            setGeneratedLink(fakeUrl);
            setMessage('Link başarıyla oluşturuldu! 🎉');
            
            // Formu temizleyelim ki yeni link oluşturulabilsin
            setFormData({ clientName: '', amount: '', projectDescription: '' });

        } catch (error) {
            console.error('Link oluşturma hatası:', error);
            setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='container py-5'>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    
                    {/* ANA KART */}
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-white border-0 pt-4 pb-2 text-center">
                            <h3 className="fw-bold text-dark">Yeni Ödeme Linki</h3>
                            <p className="text-muted small">Müşterine göndermek için hızlıca link oluştur.</p>
                        </div>
                        
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                
                                {/* Müşteri Adı */}
                                <div className="mb-4">
                                    <label htmlFor="clientName" className="form-label fw-bold text-muted small">MÜŞTERİ ADI / FİRMA</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">👤</span>
                                        <input 
                                            type="text" 
                                            className="form-control bg-light border-start-0 py-2" 
                                            id="clientName" 
                                            name="clientName" 
                                            placeholder="Örn: Ahmet Yılmaz A.Ş."
                                            value={formData.clientName} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Tutar */}
                                <div className="mb-4">
                                    <label htmlFor="amount" className="form-label fw-bold text-muted small">TAHSİLAT TUTARI</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">₺</span>
                                        <input 
                                            type="number" 
                                            className="form-control bg-light border-start-0 py-2" 
                                            id="amount" 
                                            name="amount" 
                                            placeholder="0.00"
                                            value={formData.amount} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>

                                {/* Açıklama */}
                                <div className="mb-4">
                                    <label htmlFor="projectDescription" className="form-label fw-bold text-muted small">PROJE AÇIKLAMASI</label>
                                    <textarea 
                                        className="form-control bg-light py-2" 
                                        id="projectDescription" 
                                        name="projectDescription" 
                                        rows="3"
                                        placeholder="Örn: E-Ticaret Sitesi Tasarımı - Şubat Taksiti"
                                        value={formData.projectDescription} 
                                        onChange={handleChange} 
                                        required
                                    ></textarea>
                                </div>

                                {/* Buton */}
                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-success py-3 fw-bold shadow-sm"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Oluşturuluyor...' : '✨ Ödeme Linkini Oluştur'}
                                    </button>
                                </div>
                            </form>

                            {/* SONUÇ ALANI (BAŞARILIYSA GÖRÜNÜR) */}
                            {generatedLink && (
                                <div className="alert alert-success mt-4 border-0 shadow-sm" role="alert">
                                    <h5 className="alert-heading fw-bold">Link Hazır! 🚀</h5>
                                    <p className="mb-2">Aşağıdaki linki kopyalayıp müşterine gönderebilirsin:</p>
                                    
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control bg-white" 
                                            value={generatedLink} 
                                            readOnly 
                                        />
                                        <a 
                                            href={generatedLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="btn btn-outline-success"
                                        >
                                            Aç & Kontrol Et
                                        </a>
                                    </div>
                                    <hr />
                                    <p className="mb-0 small text-center">
                                        <a href="/" className="text-success text-decoration-none fw-bold">← Dashboard'a Dön ve Kontrol Et</a>
                                    </p>
                                </div>
                            )}

                            {/* HATA MESAJI */}
                            {message && !generatedLink && (
                                <div className="alert alert-danger mt-3 text-center" role="alert">
                                    {message}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateLink;