import React from 'react';
import { useState, useEffect } from 'react';
import { getSummary, getTransactions, getLinks } from "../services/api";

const Dashboard = () => {

    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [summaryData, transactionsData, linksData] = await Promise.all([
                    getSummary(),
                    getTransactions(),
                    getLinks()
                ]);
                setLinks(linksData);
                setSummary(summaryData);
                setTransactions(transactionsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // --- MANTIK DÜZELTMESİ ---
    // Eğer bakiye hedeften büyükse bar %150 oluyordu, bu da tasarımı bozuyordu.
    // Math.min ile en fazla %100 olmasını sağladık.
    let XP = summary ? summary.netBalance : 0;
    let target = 50000; // Hedefi biraz düşürdüm ki bar dolu gözüksün (Demo taktiği)
    let rawProgress = (XP / target) * 100;
    let progress = Math.min(Math.round(rawProgress), 100); 

    // --- PARA FORMATLAMA (PROFESYONEL GÖRÜNÜM) ---
    // 15000 yerine 15.000,00 ₺ yazar.
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
    };

    return (
        <div className='container py-5'> {/* Üsten boşluk bırakıldı */}
            
            {/* BAŞLIK VE LEVEL ALANI */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-dark mb-0">👋 Hoşgeldin, Girişimci</h2>
                    <p className="text-muted">Finansal durumun harika görünüyor.</p>
                </div>
                <div className="text-end">
                    <span className="badge bg-success p-2">Level 3</span>
                </div>
            </div>

            {/* GAMIFICATION (LEVEL BAR) KARTI */}
            <div className="card shadow-sm border-0 mb-5">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <span className="fw-bold text-success">🏆 Girişimci Seviyesi</span>
                        <span className="text-muted">{progress}% / 100%</span>
                    </div>
                    <div className="progress" style={{ height: '25px', borderRadius: '15px' }}>
                        <div 
                            className="progress-bar progress-bar-striped progress-bar-animated bg-success" 
                            role="progressbar" 
                            style={{ width: `${progress}%` }} 
                            aria-valuenow={progress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                        >
                            {progress > 10 ? `${progress}%` : ''}
                        </div>
                    </div>
                    <small className="text-muted mt-2 d-block">
                        Bir sonraki seviye için <strong>{formatCurrency(target - XP > 0 ? target - XP : 0)}</strong> daha biriktirmelisin.
                    </small>
                </div>
            </div>

            {/* ÖZET KARTLARI (SUMMARY) */}
            <div className='row g-4 mb-5'> {/* g-4 kartlar arası boşluk açar */}
                <div className='col-md-4'>
                    <div className='card shadow border-0 h-100'> {/* h-100 boyları eşitler */}
                        <div className='card-body text-center'>
                            <h6 className='text-muted text-uppercase mb-3'>Toplam Gelir</h6>
                            <h3 className='card-title text-success fw-bold'>
                                {summary ? formatCurrency(summary.totalIncome) : '...'}
                            </h3>
                            <i className="bi bi-arrow-up-circle-fill text-success fs-4"></i> {/* İkon eklenebilir */}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card shadow border-0 h-100'>
                        <div className='card-body text-center'>
                            <h6 className='text-muted text-uppercase mb-3'>Toplam Gider</h6>
                            <h3 className='card-title text-danger fw-bold'>
                                {summary ? formatCurrency(summary.totalExpense) : '...'}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card shadow border-0 h-100' style={{backgroundColor: '#e6fffa'}}> {/* Hafif yeşil arka plan */}
                        <div className='card-body text-center'>
                            <h6 className='text-muted text-uppercase mb-3'>Net Bakiye (Kumbara)</h6>
                            <h3 className='card-title text-dark fw-bold'>
                                {summary ? formatCurrency(summary.netBalance) : '...'}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLOLAR ALANI */}
            <div className="row">
                
                {/* SOL TARAF: SON İŞLEMLER */}
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold">📉 Son İşlemler</h5>
                        </div>
                        <div className="table-responsive">
                            <table className='table table-hover mb-0 align-middle'>
                                <thead className="table-light">
                                    <tr>
                                        <th>Başlık</th>
                                        <th>Tutar</th>
                                        <th>Tarih</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map(transaction => (
                                            <tr key={transaction.id}>
                                                <td className="fw-medium">{transaction.title}</td>
                                                <td className={transaction.category === 'Gelir' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                                    {transaction.category === 'Gelir' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                </td>
                                                <td className="text-muted small">
                                                    {new Date(transaction.date).toLocaleDateString('tr-TR')}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="3" className="text-center py-3">Yükleniyor...</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* SAĞ TARAF: OLUŞTURULAN LİNKLER */}
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">🔗 Aktif Ödeme Linkleri</h5>
                            <button className="btn btn-sm btn-success rounded-pill">+ Yeni Link</button>
                        </div>
                        <div className="table-responsive">
                            <table className='table table-hover mb-0 align-middle'>
                                <thead className="table-light">
                                    <tr>
                                        <th>Müşteri</th>
                                        <th>Tutar</th>
                                        <th>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.length > 0 ? (
                                        links.map(link => (
                                            <tr key={link.id}>
                                                <td>
                                                    <div className="fw-bold">{link.clientName}</div>
                                                    <small className="text-muted">{link.projectDescription}</small>
                                                </td>
                                                <td className="fw-bold">{formatCurrency(link.amount)}</td>
                                                <td>
                                                    <a
                                                        href={`https://garanti-solo.com/pay/${link.id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-outline-success rounded-pill px-3"
                                                    >
                                                        Görüntüle
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="3" className="text-center py-3">Henüz link oluşturulmadı.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Dashboard;