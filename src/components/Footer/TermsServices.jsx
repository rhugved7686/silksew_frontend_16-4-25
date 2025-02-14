import React from "react";

const TermsServices = () => {
  const styles = {
    container: {
      width: "100%",
      maxWidth: "100%",
      margin: "0",
      padding: "30px",
      backgroundColor: "#ffffff",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.0", // Reduced line height for less spacing
      color: "#333",
    },
    heading1: {
      textAlign: "left",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px", // Reduced spacing between heading1 and content below
    },
    heading2: {
      fontSize: "18px",
      fontWeight: "bold",
      marginTop: "10px", // Reduced top margin between headings
      marginBottom: "8px", // Reduced bottom margin to decrease space between sections
      borderBottom: "1px solid #ddd",
      paddingBottom: "3px",
    },
    paragraph: {
      fontSize: "16px",
      marginBottom: "8px", // Reduced spacing after paragraphs
    },
    list: {
      paddingLeft: "18px", // Reduced padding for list
    },
    listItem: {
      fontSize: "16px",
      listStyleType: "disc",
      marginBottom: "6px", // Reduced spacing between list items
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading1}>Terms of Service</h1>
      <p style={styles.paragraph}><strong>Effective Date:</strong> 13/02/2025</p>

      <h2 style={styles.heading2}>1. Introduction</h2>
      <p style={styles.paragraph}>
        Welcome to Silksew! These Terms of Service govern your use of our website, <a href="https://www.silksew.com" style={styles.link}>www.silksew.com</a>.
      </p>

      <h2 style={styles.heading2}>2. Use of Our Website</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>You must be at least 15 years old to use our services.</li>
        <li style={styles.listItem}>You agree not to use our website for any unlawful activities.</li>
        <li style={styles.listItem}>We reserve the right to refuse service to anyone for any reason.</li>
      </ul>

      <h2 style={styles.heading2}>3. Account Registration</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Creating an account may be required for purchases.</li>
        <li style={styles.listItem}>You are responsible for your account security.</li>
      </ul>

      <h2 style={styles.heading2}>4. Product Information & Pricing</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>We strive for accurate product descriptions and pricing.</li>
        <li style={styles.listItem}>Prices and availability may change without notice.</li>
      </ul>

      <h2 style={styles.heading2}>5. Orders & Payments</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Orders are subject to acceptance and availability.</li>
        <li style={styles.listItem}>Payments are securely processed via third-party gateways.</li>
      </ul>

      <h2 style={styles.heading2}>6. Shipping & Delivery</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>We aim to ship orders promptly.</li>
        <li style={styles.listItem}>Delivery times depend on location and carrier.</li>
      </ul>

      <h2 style={styles.heading2}>7. Returns & Refunds</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>Returns and exchanges follow our Return Policy.</li>
        <li style={styles.listItem}>Refunds are processed via the original payment method.</li>
      </ul>

      <h2 style={styles.heading2}>8. Intellectual Property</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>All website content is our property or licensed to us.</li>
        <li style={styles.listItem}>Copying or using content without permission is prohibited.</li>
      </ul>

      <h2 style={styles.heading2}>9. Limitation of Liability</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>We are not responsible for indirect or incidental damages.</li>
        <li style={styles.listItem}>Our liability is limited to the amount paid for a product.</li>
      </ul>

      <h2 style={styles.heading2}>10. Governing Law</h2>
      <p style={styles.paragraph}>These terms are governed by the laws of India. Disputes will be handled in Maharashtra courts.</p>

      <h2 style={styles.heading2}>11. Changes to These Terms</h2>
      <p style={styles.paragraph}>We may update these terms at any time. Continued use of our site means you accept the changes.</p>

      <h2 style={styles.heading2}>12. Contact Us</h2>
      <p style={styles.paragraph}>For any questions, contact us:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Email:</strong> Info@Silksew.com</li>
        <li style={styles.listItem}><strong>Phone:</strong> +91 91457300054</li>
        <li style={styles.listItem}><strong>Address:</strong> ----</li>

      </ul>
    </div>
  );
};

export default TermsServices;
