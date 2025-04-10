import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, Phone, Hash, CreditCard, UserSquare, CheckCircle, AlertCircle, UserPlus, FileSpreadsheet, Upload, FileX, Loader2, AlertTriangle } from 'lucide-react';
interface FormData {
  name: string;
  address: string;
  contactNumber: string;
  sltNumber: string;
  accountNumber: string;
  nicNumber: string;
}
const initialFormData: FormData = {
  name: '',
  address: '',
  contactNumber: '',
  sltNumber: '',
  accountNumber: '',
  nicNumber: ''
};
export function CustomerRegistrationForm({
  isOpen,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLargeFileWarning, setShowLargeFileWarning] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.sltNumber.trim()) newErrors.sltNumber = 'SLT number is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 5000);
  };
  const handleUpload = async () => {
    if (!uploadedFile) return;
    setIsSubmitting(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 5000);
  };
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateExcelFile(file)) {
      setUploadError('');
    }
  };
  const handleFileRemove = () => {
    setUploadedFile(null);
    setUploadError('');
    setUploadProgress(0);
  };
  const validateExcelFile = (file: File) => {
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Please upload only Excel (.xlsx) files');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size should be less than 5MB');
      return false;
    }
    setShowLargeFileWarning(true);
    setUploadedFile(file);
    return true;
  };
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (validateExcelFile(file)) {
      setUploadError('');
    }
  }, []);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{
      scale: 0.95,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} exit={{
      scale: 0.95,
      opacity: 0
    }} onClick={e => e.stopPropagation()} className="bg-gray-800 rounded-2xl w-full max-w-xl border border-blue-500/20 overflow-hidden">
        {showSuccess ? <motion.div initial={{
        scale: 0.9
      }} animate={{
        scale: 1
      }} className="p-8 text-center relative overflow-hidden">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
            {[...Array(3)].map((_, i) => <motion.div key={i} className="absolute left-1/2 top-1/2 w-32 h-32 rounded-full border border-green-500/30" initial={{
          scale: 0
        }} animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3]
        }} transition={{
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity,
          ease: 'easeOut'
        }} />)}
            <motion.div className="relative" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}>
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle size={48} className="text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="relative">
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {activeTab === 'manual' ? 'Customer Added' : 'File Uploaded'}{' '}
                Successfully!
              </h3>
              <p className="text-gray-400">
                {activeTab === 'manual' ? 'The customer has been registered in the system.' : 'The customer data has been imported from the Excel file.'}
              </p>
            </motion.div>
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500" initial={{
          scaleX: 1
        }} animate={{
          scaleX: 0
        }} transition={{
          duration: 5,
          ease: 'linear'
        }} style={{
          transformOrigin: 'left'
        }} />
          </motion.div> : <>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center">
                  <UserPlus size={24} className="mr-2" />
                  Add New Customer
                </h3>
                <motion.button whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} />
                </motion.button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex space-x-2 mb-6">
                {[{
              id: 'manual',
              label: 'Manual Entry',
              icon: User
            }, {
              id: 'excel',
              label: 'Excel Upload',
              icon: FileSpreadsheet
            }].map(tab => <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2
                      ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </motion.button>)}
              </div>
              <AnimatePresence mode="wait">
                {activeTab === 'manual' ? <motion.div key="manual" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: 20
            }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <FloatingLabelInput id="name" label="Full Name" value={formData.name} onChange={handleInputChange('name')} error={errors.name} icon={<User size={18} className="text-gray-400" />} />
                      </div>
                      <div className="col-span-2">
                        <FloatingLabelInput id="address" label="Address" value={formData.address} onChange={handleInputChange('address')} error={errors.address} icon={<MapPin size={18} className="text-gray-400" />} />
                      </div>
                      <FloatingLabelInput id="contact" label="Contact Number" value={formData.contactNumber} onChange={handleInputChange('contactNumber')} error={errors.contactNumber} icon={<Phone size={18} className="text-gray-400" />} />
                      <FloatingLabelInput id="slt" label="SLT Number" value={formData.sltNumber} onChange={handleInputChange('sltNumber')} error={errors.sltNumber} icon={<Hash size={18} className="text-gray-400" />} />
                      <FloatingLabelInput id="account" label="Account Number" value={formData.accountNumber} onChange={handleInputChange('accountNumber')} error={errors.accountNumber} icon={<CreditCard size={18} className="text-gray-400" />} />
                      <FloatingLabelInput id="nic" label="NIC Number" value={formData.nicNumber} onChange={handleInputChange('nicNumber')} error={errors.nicNumber} icon={<UserSquare size={18} className="text-gray-400" />} />
                    </div>
                    <motion.button onClick={handleSubmit} disabled={isSubmitting} className={`w-full py-3 rounded-xl font-medium relative overflow-hidden
                        ${isSubmitting ? 'bg-blue-600/50 cursor-wait' : 'bg-blue-600 hover:bg-blue-500'}`} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? <>
                            <Loader2 size={20} className="animate-spin mr-2" />
                            Processing...
                          </> : 'Register Customer'}
                      </span>
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" initial={false} animate={{
                  scale: isSubmitting ? [1, 1.5] : 1,
                  opacity: isSubmitting ? [1, 0] : 1
                }} transition={{
                  duration: 1,
                  repeat: isSubmitting ? Infinity : 0
                }} />
                    </motion.button>
                  </motion.div> : <motion.div key="excel" initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} className="space-y-4">
                    <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
                        ${isDragging ? 'border-blue-500 bg-blue-500/10' : uploadedFile ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-gray-500'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                      {!uploadedFile && <input type="file" accept=".xlsx" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />}
                      <div className="space-y-4">
                        <motion.div animate={{
                    scale: isDragging ? 1.1 : 1
                  }} className="w-16 h-16 mx-auto rounded-xl bg-blue-600/20 flex items-center justify-center">
                          {uploadedFile ? <FileSpreadsheet size={32} className="text-green-400" /> : <Upload size={32} className="text-blue-400" />}
                        </motion.div>
                        {uploadedFile ? <div className="space-y-2">
                            <p className="text-green-400 font-medium">
                              {uploadedFile.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <motion.button initial={{
                      opacity: 0,
                      y: 10
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} whileHover={{
                      scale: 1.05
                    }} whileTap={{
                      scale: 0.95
                    }} onClick={handleFileRemove} className="mt-4 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors inline-flex items-center space-x-2">
                              <X size={16} />
                              <span>Remove File</span>
                            </motion.button>
                          </div> : <div className="space-y-2">
                            <p className="font-medium">
                              Drag & drop your Excel file here
                            </p>
                            <p className="text-sm text-gray-400">
                              or click to browse
                            </p>
                          </div>}
                      </div>
                    </div>
                    {uploadError && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
                        <FileX size={18} />
                        <span>{uploadError}</span>
                      </motion.div>}
                    {uploadedFile && !isSubmitting && <motion.button initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={handleUpload} className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium">
                        Upload File
                      </motion.button>}
                    {isSubmitting && <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} className="space-y-4">
                        <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500" initial={{
                    x: '-100%'
                  }} animate={{
                    x: `${uploadProgress - 100}%`
                  }} transition={{
                    duration: 0.5
                  }} />
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{
                    x: ['-100%', '100%']
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <motion.div animate={{
                      rotate: 360
                    }} transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear'
                    }}>
                              <Loader2 size={20} className="text-blue-400" />
                            </motion.div>
                            <span className="text-blue-400">
                              Processing file...
                            </span>
                          </div>
                          <motion.span key={uploadProgress} initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} className="text-sm font-medium bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                            {uploadProgress}%
                          </motion.span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[...Array(4)].map((_, i) => <motion.div key={i} className="h-1 bg-blue-500/20 rounded-full" animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1]
                  }} transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity
                  }} />)}
                        </div>
                      </motion.div>}
                  </motion.div>}
              </AnimatePresence>
            </div>
          </>}
      </motion.div>
      <AnimatePresence>
        {showLargeFileWarning && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} className="bg-gray-800 rounded-2xl w-full max-w-lg border border-yellow-500/20 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle size={24} className="text-yellow-200" />
                    <h3 className="text-xl font-bold">Large File Notice</h3>
                  </div>
                  <motion.button whileHover={{
                scale: 1.1,
                rotate: 90
              }} whileTap={{
                scale: 0.9
              }} onClick={() => setShowLargeFileWarning(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <p className="text-yellow-400 mb-2">
                      Processing a large customer dataset
                    </p>
                    <p className="text-gray-400 text-sm">
                      Please note that processing large files may:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-400">
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                        <span>Take longer to process</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                        <span>Require more system resources</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                        <span>Need stable network connection</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => setShowLargeFileWarning(false)} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-medium">
                    I Understand
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}
function FloatingLabelInput({
  id,
  label,
  value,
  onChange,
  error,
  icon
}) {
  const [isFocused, setIsFocused] = useState(false);
  return <div className="relative">
      <div className="relative">
        <input id={id} type="text" value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={`w-full px-4 py-3 bg-gray-900/50 rounded-xl text-white placeholder-transparent
            peer transition-colors border ${error ? 'border-red-500/50' : isFocused ? 'border-blue-500' : 'border-gray-700'}
            focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/50' : 'focus:ring-blue-500/50'} pl-10`} placeholder={label} />
        <label htmlFor={id} className={`absolute left-9 transition-all duration-200
            ${isFocused || value ? 'text-xs -top-2 bg-gray-800 px-2 rounded' : 'text-base top-3'}
            ${error ? 'text-red-400' : isFocused ? 'text-blue-400' : 'text-gray-400'}
            peer-placeholder-shown:text-base peer-placeholder-shown:top-3
            peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-gray-800 peer-focus:px-2 peer-focus:rounded
            peer-focus:text-blue-400`}>
          {label}
        </label>
        <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
      </div>
      {error && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex items-center space-x-1 mt-1">
          <AlertCircle size={14} className="text-red-400" />
          <span className="text-xs text-red-400">{error}</span>
        </motion.div>}
    </div>;
}