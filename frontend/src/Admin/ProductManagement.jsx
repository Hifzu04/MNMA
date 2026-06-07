import React, { useState } from 'react';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    sizes: '',
    colors: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      countInStock: Number(product.countInStock),
      sizes: product.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: product.colors.split(',').map(c => c.trim()).filter(Boolean),
      imagePreview: product.image ? URL.createObjectURL(product.image) : null
    };

    setProducts((prev) => [...prev, newProduct]);
    
    setProduct({
      name: '',
      description: '',
      price: 0,
      countInStock: 0,
      sku: '',
      sizes: '',
      colors: '',
      image: null
    });
    e.target.reset();
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Product Management</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} style={inputStyle} required />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} rows="3" style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ ...fieldStyle, flex: 1 }}>
            <label style={labelStyle}>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={{ ...fieldStyle, flex: 1 }}>
            <label style={labelStyle}>Count in Stock</label>
            <input type="number" name="countInStock" value={product.countInStock} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>SKU</label>
          <input type="text" name="sku" value={product.sku} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Sizes (comma-separated)</label>
          <input type="text" name="sizes" placeholder="S, M, L" value={product.sizes} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Colors (comma-separated)</label>
          <input type="text" name="colors" placeholder="Black, White" value={product.colors} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" style={btnStyle}>Save Product</button>
      </form>

      <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '40px 0' }} />

      <h2>Product List ({products.length})</h2>
      {products.length === 0 ? (
        <p style={{ color: '#666' }}>No products uploaded yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {products.map((p) => (
            <div key={p.id} style={cardStyle}>
              {p.imagePreview && (
                <img src={p.imagePreview} alt={p.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{p.name}</h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#555' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#777' }}>
                  <span><strong>Price:</strong> ${p.price}</span>
                  <span><strong>Stock:</strong> {p.countInStock}</span>
                  <span><strong>SKU:</strong> {p.sku || 'N/A'}</span>
                </div>
                {(p.sizes.length > 0 || p.colors.length > 0) && (
                  <div style={{ marginTop: '5px', fontSize: '12px', color: '#888' }}>
                    {p.sizes.length > 0 && <div><strong>Sizes:</strong> {p.sizes.join(', ')}</div>}
                    {p.colors.length > 0 && <div><strong>Colors:</strong> {p.colors.join(', ')}</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const fieldStyle = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontWeight: '600', fontSize: '14px', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const btnStyle = { padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' };
const cardStyle = { display: 'flex', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '6px', alignItems: 'center', backgroundColor: '#fafafa' };