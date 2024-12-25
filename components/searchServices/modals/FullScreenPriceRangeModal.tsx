import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { MedianPrice } from "types/ServiceTypes";

interface FullScreenPriceRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (range: { min: number; max: number }) => void;
  priceDistribution: MedianPrice[];
  minPrice: number;
  maxPrice: number;
}

const FullScreenPriceRangeModal: React.FC<FullScreenPriceRangeModalProps> = ({
  isOpen,
  onClose,
  onApply,
  priceDistribution,
  minPrice,
  maxPrice,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      setChartWidth(window.innerWidth - 48);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Reset price range when min/max prices change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const handleApply = () => {
    onApply({ min: priceRange[0], max: priceRange[1] });
    onClose();
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-gray-500"
            style={{ marginRight: 8 }}
          />
          Price Range
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: "20px 0" }}>
          <Typography gutterBottom>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>

          <div style={{ width: '100%', height: 100, marginBottom: 20 }}>
            {chartWidth > 0 && priceDistribution && (
              <BarChart
                width={chartWidth}
                height={100}
                data={priceDistribution}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <Bar
                  dataKey="count"
                  fill="#90CAF9"
                  radius={[2, 2, 0, 0]}
                />
                <XAxis dataKey="price" hide={true} />
                <YAxis hide={true} />
              </BarChart>
            )}
          </div>

          <Slider
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            step={1}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginBottom: 28, height: "3.5rem" }}
          fullWidth
          onClick={handleApply}
          variant="contained"
          color="primary"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FullScreenPriceRangeModal;