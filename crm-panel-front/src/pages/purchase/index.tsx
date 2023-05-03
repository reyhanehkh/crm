import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductApi from "../../api/product";
import ProductTypeApi from "../../api/product-type";
import PurchaseTicketApi from "../../api/purchase-ticket";
import AuthContext from "../../components/auth-context";
import useAppNavigate from "../../components/router/use-app-navigate";
import ProductBox from "../../components/product";
import SearchFilters from "../../components/search-filters";
import FilterWrapper from "../../components/search-filters/filter-wrapper";
import { getCopyOf } from "../../functions";
import Product from "../../types/product";
import ProductTypeSpecs, {
  ProductTypeSpec,
} from "../../types/prtoduct-type-specs";
import { Col, Row } from "react-bootstrap";
import ShoppingCardWarning from "./warning";
import SortBox from "../../components/sort-box";

function Purchase() {
  let [products, setProducts] = useState<Product[]>([]);
  let [productSpecs, setProductSpecs] = useState<ProductTypeSpecs>({});
  let [error, setError] = useState<string>("");
  let [sortBy, setSortBy] = useState<string>("newest");
  const context = useContext(AuthContext);
  let navigate = useAppNavigate();
  var { activeFileId } = context;
  let { type } = useParams();
  let productType = 0;
  switch (type) {
    case "service":
      productType = 0;
      break;
    case "packages":
      productType = 4;
      break;
    case "ip":
      productType = 6;
      break;
  }
  useEffect(() => {
    if (activeFileId) {
      const productApi = new ProductApi(context);
      const productTypeApi = new ProductTypeApi(context);
      productApi
        .getAll(activeFileId, productType)
        .then((result) => setProducts(result));
      productTypeApi
        .get(productType, activeFileId)
        .then((result) => result && setProductSpecs(result.specs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFileId, productType]);

  const selectedValuesChanges = (specId: string, data: string[]) => {
    console.log("selectedValuesChanges", specId, data);
    var specs = getCopyOf(productSpecs);
    specs[specId].selectedValues = data ? [...data] : null;
    setProductSpecs(specs);
  };

  const selectedRangeChanges = (specId: string, data: number[]) => {
    var specs = getCopyOf(productSpecs);
    specs[specId].selectedRange = data ? [...data] : null;
    setProductSpecs(specs);
  };
  const isInRangeOfSpec = (spec: ProductTypeSpec, value: number) => {
    // console.log("isInRangeOfSpec", spec, value);
    if (spec) {
      const { selectedRange } = spec;
      if (selectedRange) {
        return selectedRange[0] <= value && selectedRange[1] >= value;
      }
    }
    return true;
  };
  const productSelected = (productId: number) => {
    const purchaseTicketApi = new PurchaseTicketApi(context);
    purchaseTicketApi
      .post(activeFileId!, productId, productType)
      .then((ticket) => {
        if (ticket.errorMessage) setError(ticket.errorMessage);
        else {
          new PurchaseTicketApi(context)
            .getAll()
            .then(context.setTickets)
            .catch(() => {});
          navigate(`/payment/${ticket.id}`);
        }
      });
  };

  const getSortedFilteredProducts = () => {
    if (!products) return [];
    return sortProducts(filterProducts(products));
  };

  const sortProducts = (products: Product[]) => {
    return products.sort(compareProducts);
  };

  const compareProducts = (a: Product, b: Product) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id;
      case "grandest":
        return b.finalPrice - a.finalPrice;
      case "cheapest":
        return a.finalPrice - b.finalPrice;
      default:
        return 0;
    }
  };

  const filterProducts = (products: Product[]) => {
    var result = products.filter(
      (product) =>
        isInRangeOfSpec(productSpecs[255], product.finalPrice) &&
        product.specs.every((spec) => {
          // console.log("filterProducts.filter", spec, productSpecs[spec.specId]);
          if (!(spec.specId in productSpecs)) return false;
          const { selectedValues } = productSpecs[spec.specId];
          if (selectedValues) {
            return selectedValues.includes(
              `${spec.value == null ? "" : spec.value}`
            );
          }
          return isInRangeOfSpec(productSpecs[spec.specId], spec.value);
        })
    );
    // console.log("filterProducts", products, result);
    return result;
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const specs = [];
  for (var specId in productSpecs) {
    const id = specId;
    specs.push(
      <FilterWrapper
        key={id}
        spec={productSpecs[id]}
        selectedRangeChanges={(r) => selectedRangeChanges(id, r)}
        selectedValuesChanges={(v) => selectedValuesChanges(id, v)}
      />
    );
  }
  console.log("specs", specs);
  return (
    <>
      <ShoppingCardWarning />
      <Row>
        <SearchFilters className="col-12 col-lg-3">{specs}</SearchFilters>
        <Col lg={9} className="pb-3" style={{ paddingRight: "0px" }}>
          <SortBox onChange={handleSort} value={sortBy} />
          <Row className="d-flex justify-content-center mx-1 mx-lg-0">
            {getSortedFilteredProducts().map((product) => (
              <ProductBox
                key={product.id}
                title={product.title}
                finalPrice={product.finalPrice}
                mainPrice={product.mainPrice}
                packageTitle={product.packageTitle}
                desc={product.desc}
                onSelect={() => productSelected(product.id)}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Purchase;
